import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const collapsedBg = "#2186eb";
const expandedBg = "#eaf3fe";

// Fetch products from backend
async function fetchProducts(query: string) {
  const res = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(query)}`);
  return await res.json();
}

// Fetch products by IDs
async function fetchByIds(ids: string[]) {
  if (ids.length === 0) return [];
  
  const res = await fetch(
    `http://localhost:4000/api/products?ids=${ids.join(',')}`
  );
  return await res.json();
}

// Fetch similar products
async function fetchSimilar(category: string, excludeId: string) {
  const res = await fetch(
    `http://localhost:4000/api/search?category=${encodeURIComponent(category)}`
  );
  const data = await res.json();
  return data.filter((p: any) => p._id !== excludeId).slice(0, 5);
}

// Chatbot recommendation
async function chatBotRecommend(prompt: string) {
  const res = await fetch("http://localhost:4000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prompt }),
  });
  return await res.json();
}

export default function ChatBanner() {
  const [state, setState] = useState<"collapsed" | "input" | "chat">("collapsed");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; type: "user" | "ai" }[]>([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Similar popup state
  const [hovered, setHovered] = useState<string | null>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  // Cart simulation
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (state === "input" && inputRef.current) inputRef.current.focus();
  }, [state]);

  // Add to cart function
  function addToCart(product: any) {
    setCart((prev) => [...prev, product]);
    alert(`Added "${product.name}" to cart!`);
  }

  async function handleSend() {
    if (!input.trim()) return;

    // Add user message
    setMessages(msgs => [...msgs, { text: input, type: "user" }]);
    setInput("");
    setState("chat");
    setProducts([]);
    setLoading(true);

    try {
      // Get recommendations
      const { items: recList, summary } = await chatBotRecommend(input);
      
      // Handle empty recommendations
      if (!recList || recList.length === 0) {
        setMessages(msgs => [
          ...msgs,
          { 
            text: summary || "No products match your request. Please try different criteria.", 
            type: "ai" 
          },
        ]);
        setLoading(false);
        return;
      }

      // Get full product details
      const ids = recList.map((r: any) => r.productId);
      const fullDocs = await fetchByIds(ids);

      // Merge with LLM recommendations
      const merged = fullDocs.map((p: any) => {
        const llmRow = recList.find((r: any) => r.productId === p._id);
        return {
          ...p,
          quantity: llmRow?.quantity || "1 unit",
          reason: llmRow?.reason || "",
        };
      });

      setProducts(merged);
      setMessages(msgs => [
        ...msgs,
        { text: summary || "Here are my recommended items!", type: "ai" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(msgs => [
        ...msgs,
        { 
          text: "Sorry, I encountered an error. Please try again later.", 
          type: "ai" 
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Similar products on hover
  async function handleProductHover(p: any) {
    setHovered(p._id);
    setSimilar([]);
    setSimilarLoading(true);
    try {
      const items = await fetchSimilar(p.category, p._id);
      setSimilar(items);
    } catch (err) {
      console.error("Error fetching similar products:", err);
    }
    setSimilarLoading(false);
  }

  function handleProductLeave() {
    setHovered(null);
    setSimilar([]);
  }

  // Sizing for animation
  const sizes =
    state === "collapsed"
      ? { w: 380, h: 62 }
      : state === "input"
      ? { w: 700, h: 66 }
      : { w: 700, h: Math.max(270, 110 + messages.length * 48 + products.length * 180) };

  return (
    <div className="flex justify-center w-full mt-10 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="shadow-xl flex flex-col items-center"
        style={{
          background: state === "collapsed" ? collapsedBg : expandedBg,
          borderRadius: state === "collapsed" ? 38 : 28,
          width: sizes.w,
          minHeight: sizes.h,
          boxShadow:
            "0 4px 24px 0 rgba(33,134,235,0.12), 0 2px 12px 0 rgba(0,0,0,0.04)",
          padding: state === "collapsed" ? "0" : "22px 24px",
          justifyContent: "center",
        }}
      >
        {/* Collapsed state */}
        {state === "collapsed" && (
          <button
            className="w-full h-full flex items-center justify-center text-white font-bold text-xl focus:outline-none"
            onClick={() => setState("input")}
          >
            Chat to Buy – Ask me anything
          </button>
        )}

        {/* Expanded input/chat */}
        {(state === "input" || state === "chat") && (
          <div className="w-full flex flex-col">
            {/* Chat messages */}
            <div className="mb-2 flex flex-col gap-2">
              <AnimatePresence>
                {messages.map((msg, i) =>
                  msg.type === "user" ? (
                    <motion.div
                      key={i}
                      className="self-end bg-white text-blue-900 px-4 py-2 rounded-2xl font-medium shadow max-w-[70%]"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {msg.text}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={i}
                      className="self-start bg-blue-100 text-blue-900 px-4 py-2 rounded-2xl font-medium shadow max-w-[70%]"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {msg.text}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex flex-col items-center my-4">
                <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-2"></div>
                <p className="text-blue-700">Finding best products for you...</p>
              </div>
            )}
            
            {/* Empty state */}
            {!loading && products.length === 0 && state === "chat" && (
              <div className="text-center py-4">
                <p className="text-red-600 mb-2">No products found</p>
                <button 
                  onClick={() => setState("input")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Product cards */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {!loading && products.length > 0 &&
                products.map((p: any) => (
                  <motion.div
                    layout
                    key={p._id}
                    className="relative bg-white/95 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 p-4 mt-2 border-2 border-blue-100"
                    onMouseEnter={() => handleProductHover(p)}
                    onMouseLeave={handleProductLeave}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-28 w-28 object-contain rounded-xl shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-blue-900 text-lg">{p.name}</div>
                      {p.brand && (
                        <div className="text-base text-gray-600 mb-2">{p.brand}</div>
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-green-700 text-lg">₹{p.price}</span>
                        {p.stock < 5 && (
                          <span className="bg-red-100 text-red-800 text-xs rounded px-2 py-1">
                            Low stock!
                          </span>
                        )}
                      </div>
                      {p.reason && (
                        <div className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Why:</span> {p.reason}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                        >
                          Add to Cart
                        </button>
                        <span className="text-sm text-gray-600">
                          Qty: {p.quantity}
                        </span>
                      </div>
                    </div>
                    
                    {/* Similar products popup */}
                    <AnimatePresence>
                      {hovered === p._id && (
                        <motion.div
                          initial={{ opacity: 0, x: 32 }}
                          animate={{ opacity: 1, x: 16 }}
                          exit={{ opacity: 0, x: 32 }}
                          className="absolute top-0 left-full ml-4 z-50 w-56 bg-white rounded-2xl shadow-2xl border border-blue-100 p-3"
                        >
                          <div className="font-semibold text-blue-700 text-sm mb-2">
                            Similar Items
                          </div>
                          {similarLoading && (
                            <div className="text-xs text-blue-500 py-4 text-center">Loading…</div>
                          )}
                          {!similarLoading && similar.length === 0 && (
                            <div className="text-xs text-gray-400 py-3">No similar products found.</div>
                          )}
                          {!similarLoading && similar.length > 0 && (
                            <div className="flex flex-col gap-2">
                              {similar.map((s) => (
                                <div key={s._id} className="flex gap-2 items-center py-1 hover:bg-blue-50 rounded-lg transition">
                                  <img src={s.image} alt={s.name} className="w-10 h-10 rounded bg-gray-100 object-contain" />
                                  <div className="flex-1">
                                    <div className="text-xs font-medium text-blue-900 truncate">{s.name}</div>
                                    <div className="text-xs text-green-700 font-semibold">₹{s.price}</div>
                                  </div>
                                  <button
                                    className="bg-blue-100 text-blue-700 rounded px-2 text-xs font-semibold hover:bg-blue-200 transition"
                                    onClick={() => addToCart(s)}
                                  >
                                    Add
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
            </div>
            
            {/* Input row */}
            <div className="flex items-center gap-3 w-full mt-4">
              <input
                ref={inputRef}
                className="flex-1 rounded-full px-5 py-3 text-lg font-medium focus:outline-none border-none bg-blue-100 placeholder:text-blue-400 transition-all"
                placeholder="Type your request…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="rounded-full px-8 py-3 bg-white text-blue-700 font-bold text-lg shadow hover:bg-blue-700 hover:text-white transition"
                onClick={handleSend}
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
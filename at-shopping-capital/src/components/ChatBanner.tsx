import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const collapsedBg = "#2186eb";
const expandedBg = "#eaf3fe";

// Utility: fetch products from DummyJSON
async function fetchProducts(query: string) {
  const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.products || [];
}

// Fetch similar by category (excluding product ID)
async function fetchSimilar(category: string, id: number) {
  const res = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=6`);
  const data = await res.json();
  // Remove the original product, return top 5
  return (data.products || []).filter((p: any) => p.id !== id).slice(0, 5);
}

export default function ChatBanner() {
  const [state, setState] = useState<"collapsed" | "input" | "chat">("collapsed");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; type: "user" | "ai" }[]>([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Similar popup state
  const [hovered, setHovered] = useState<number | null>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    if (state === "input" && inputRef.current) inputRef.current.focus();
  }, [state]);

  // Simulated "Add to cart"
  const [cart, setCart] = useState<any[]>([]);
  function addToCart(product: any) {
    setCart((prev) => [...prev, product]);
    alert(`Added "${product.title}" to cart!`);
  }

  async function handleSend() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { text: input, type: "user" }]);
    setInput("");
    setState("chat");
    setProducts([]);
    setLoading(true);
    // Fetch from DummyJSON
    const items = await fetchProducts(input);
    setProducts(items);
    // Only add AI message
    setMessages((msgs) => [
      ...msgs,
      { text: items.length === 0 ? "Sorry, no products found." : "Here are some options for you!", type: "ai" }
    ]);
    setLoading(false);
  }

  // Similar products on hover
  async function handleProductHover(p: any) {
    setHovered(p.id);
    setSimilar([]);
    setSimilarLoading(true);
    const items = await fetchSimilar(p.category, p.id);
    setSimilar(items);
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
              <div className="text-white italic text-center my-4">Loading...</div>
            )}
            {/* Product cards */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {!loading && products.length > 0 &&
                products.map((p: any) => (
                  <motion.div
                    layout
                    key={p.id}
                    className="relative bg-white/95 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 p-4 mt-2 border-2 border-blue-100"
                    onMouseEnter={() => handleProductHover(p)}
                    onMouseLeave={handleProductLeave}
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-28 w-28 object-contain rounded-xl shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-blue-900 text-lg">{p.title}</div>
                      <div className="text-base text-gray-600 mb-2">{p.brand}</div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-green-700 text-lg">₹{p.price}</span>
                        <span className="text-xs line-through text-gray-400">
                          {p.discountPercentage > 0
                            ? `₹${Math.round(p.price / (1 - p.discountPercentage / 100))}`
                            : ""}
                        </span>
                        {p.discountPercentage > 0 && (
                          <span className="bg-green-100 text-green-800 text-xs rounded px-2 py-1">
                            {Math.round(p.discountPercentage)}% OFF
                          </span>
                        )}
                        {p.stock < 5 && (
                          <span className="bg-red-100 text-red-800 text-xs rounded px-2 py-1">
                            Low stock!
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                        >
                          Add to Cart
                        </button>
                        <span className="text-yellow-600 font-semibold text-xs flex items-center gap-1">
                          ★ {p.rating}
                        </span>
                      </div>
                    </div>
                    {/* Similar products popup */}
                    <AnimatePresence>
                      {hovered === p.id && (
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
                                <div key={s.id} className="flex gap-2 items-center py-1 hover:bg-blue-50 rounded-lg transition">
                                  <img src={s.thumbnail} alt={s.title} className="w-10 h-10 rounded bg-gray-100 object-contain" />
                                  <div className="flex-1">
                                    <div className="text-xs font-medium text-blue-900 truncate">{s.title}</div>
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

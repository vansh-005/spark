  import { useState } from "react";
  import { motion } from "framer-motion";
  import { products } from "../data/products";
  import { useCart } from "../store/cart";

  export default function ChatPanel({ close }: { close: () => void }) {
    const [input, setInput] = useState("");
    const add = useCart((s) => s.add);

    return (
      <motion.div
  initial={{ opacity: 0, scale: 0.97, y: -40 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.97, y: -30 }}
  className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] md:w-[60%] rounded-3xl shadow-2xl z-50 overflow-hidden bg-white"
>
  {/* primary-bg */}
  <div className="primary-bg px-6 py-4 flex justify-between items-center">
    <h2 className="text-white font-semibold text-xl">Chat to Buy</h2>
    <button onClick={close} className="text-white text-2xl leading-none hover:text-blue-200">✕</button>
  </div>
  <div className="p-6 max-h-[60vh] overflow-y-auto">
    {input && (
      <>
        <div className="bg-blue-50 text-primary rounded-lg px-4 py-2 mb-2 inline-block font-medium">
          {input}
        </div>
        <div className="bg-blue-50 rounded-lg p-4 shadow-inner">
          <p className="font-medium mb-3 text-blue-900">Here are some ideas:</p>
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-2 py-1 text-base"
            >
              <span className="font-semibold text-blue-900">{p.name}</span>
              <span className="text-blue-700">₹{p.price}</span>
              <button
                onClick={() => add(p.id)}
                className="text-primary font-bold text-xs px-2 py-1 rounded hover:underline bg-blue-100 hover:bg-blue-200 transition"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </>
    )}
    <div className="flex gap-2 mt-6">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-blue-200 focus:border-primary rounded-lg px-3 py-2 text-base outline-none"
        placeholder="Type your request…"
      />
      <button
        onClick={() => setInput("")}
        className="bg-blue-500 text-white rounded-lg px-6 font-semibold text-base shadow hover:bg-blue-800 transition"
      >
        Send
      </button>
    </div>
    <button
      onClick={close}
      className="mt-8 w-full bg-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 transition"
    >
      Proceed to Cart
    </button>
  </div>
</motion.div>

    );
  }

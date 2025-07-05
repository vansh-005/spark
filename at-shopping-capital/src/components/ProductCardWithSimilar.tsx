import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility to fetch similar products by category or search term
async function fetchSimilar(title: string, category: string) {
  // Fetch by category, fallback to search
  let url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=6`;
  let res = await fetch(url);
  let data = await res.json();
  // Remove the product itself, return top 5
  return (data.products || []).filter((p: any) => !p.title.includes(title)).slice(0, 5);
}

export default function ProductCardWithSimilar({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter() {
    setHovered(true);
    setLoading(true);
    // Fetch similar only if not already loaded
    fetchSimilar(product.title, product.category).then((items) => {
      setSimilar(items);
      setLoading(false);
    });
  }

  function handleMouseLeave() {
    setHovered(false);
    if (timer.current) clearTimeout(timer.current);
  }

  return (
    <div className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main product card */}
      <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-md border border-blue-100">
        <img src={product.thumbnail} alt={product.title} className="h-24 w-24 object-contain rounded-xl bg-gray-50" />
        <div>
          <div className="font-bold text-blue-900 text-xl">{product.title}</div>
          <div className="flex gap-2 items-center mt-2">
            <span className="font-bold text-green-700 text-lg">₹{product.price}</span>
            <span className="text-xs line-through text-gray-400">{product.discountPercentage > 0 ? `₹${Math.round(product.price / (1 - product.discountPercentage / 100))}` : ""}</span>
            {product.discountPercentage > 0 && (
              <span className="bg-green-100 text-green-800 text-xs rounded px-2 py-1">{Math.round(product.discountPercentage)}% OFF</span>
            )}
          </div>
          <button className="mt-3 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button>
        </div>
      </div>
      {/* Similar popup */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 24 }}
            exit={{ opacity: 0, x: 16 }}
            className="absolute top-0 left-full ml-4 z-40 w-60 bg-white shadow-2xl rounded-2xl p-4 border border-blue-200"
            style={{ minHeight: 160 }}
          >
            <div className="font-semibold text-blue-800 mb-2 text-sm">Similar Products</div>
            {loading && <div className="text-blue-400 text-xs">Loading…</div>}
            {!loading && similar.length === 0 && (
              <div className="text-gray-400 text-xs">No similar items found.</div>
            )}
            {!loading && similar.length > 0 && (
              <div className="flex flex-col gap-2">
                {similar.map((sim) => (
                  <div key={sim.id} className="flex items-center gap-2 rounded-lg p-1 hover:bg-blue-50 transition">
                    <img src={sim.thumbnail} alt={sim.title} className="w-9 h-9 rounded bg-gray-100 object-contain" />
                    <div className="flex-1">
                      <div className="truncate text-xs font-medium text-blue-800">{sim.title}</div>
                      <div className="text-xs text-green-700 font-semibold">₹{sim.price}</div>
                    </div>
                    <button className="bg-blue-100 text-blue-700 rounded px-2 text-xs font-semibold hover:bg-blue-200 transition">Add</button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

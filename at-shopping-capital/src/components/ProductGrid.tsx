import { useEffect, useRef, useState } from "react";

// Utility function: fetch all products from DummyJSON
async function fetchAllProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return data.products || [];
}

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch on mount
  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  // Infinite auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || products.length === 0) return;
    const el = scrollRef.current;
    let frame: number;
    let scrollSpeed = 0.7; // px per frame

    function animate() {
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0; // Reset for infinite loop
      }
      el.scrollLeft += scrollSpeed;
      frame = requestAnimationFrame(animate);
    }

    // Duplicate product list for seamless infinite scroll
    el.scrollLeft = 0;
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [products]);

  // Duplicate products for infinite scroll illusion
  const displayProducts = [...products, ...products];

  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-xl font-semibold text-blue-900">Recommended for you</h3>
        <span className="text-gray-400 text-xs">(Scroll →)</span>
      </div>
      <div
        ref={scrollRef}
        className="relative flex gap-6 overflow-x-auto no-scrollbar py-2"
        style={{
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          width: "100%",
          maskImage: "linear-gradient(to right, transparent 0, black 40px, black calc(100% - 40px), transparent 100%)",
        }}
      >
        {displayProducts.map((p, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 bg-white border border-blue-100 rounded-2xl shadow-md p-4 mr-2 transition-transform hover:-translate-y-2"
            style={{ display: "inline-block" }}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-32 object-contain rounded-xl mb-3 bg-gray-50"
            />
            <div className="font-bold text-blue-900 text-lg truncate">{p.title}</div>
            <div className="text-base text-gray-600 mb-2">{p.brand}</div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-green-700 text-lg">₹{p.price}</span>
              {p.discountPercentage > 0 && (
                <span className="bg-green-100 text-green-800 text-xs rounded px-2 py-1">
                  {Math.round(p.discountPercentage)}% OFF
                </span>
              )}
            </div>
            <button
              className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-lg mt-2 w-full hover:bg-blue-700 transition"
              onClick={() => alert(`Add "${p.title}" to cart`)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

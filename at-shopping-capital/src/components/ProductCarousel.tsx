import { useEffect, useRef } from "react";

const ProductCarousel = ({ products }) => {
  const scrollRef = useRef(null);

  // Infinite auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || products.length === 0) return;
    const el = scrollRef.current;
    let frame;
    let scrollSpeed = 0.6; // px per frame

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
    <div className="py-6 bg-gradient-to-b from-white to-gray-50 mb-0"> {/* Remove default bottom margin */}
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 px-4">Recommended for you</h2>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-4"
          style={{
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            width: "100%",
            maskImage: "linear-gradient(to right, transparent 0, black 40px, black calc(100% - 40px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0, black 40px, black calc(100% - 40px), transparent 100%)",
          }}
        >
          {displayProducts.map((product, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-56 bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative">
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
                <img
                  src={product.thumbnail || product.image}
                  alt={product.name || product.title}
                  className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 object-contain"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 truncate">{product.name || product.title}</h3>
                {product.brand && <p className="text-xs text-gray-500">{product.brand}</p>}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductCarousel;

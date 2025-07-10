import { useCart } from "../store/cart";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function ProductCard({ id }) {
  const p = products.find((x) => x.id === id)!;
  const add = useCart((s) => s.add);

  return (
    <motion.div
      whileHover={{
        y: -12,
        boxShadow: "0 10px 32px 0 rgba(90,40,220,0.10)",
        scale: 1.05,
      }}
      className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-lg transition-all min-w-[230px] max-w-xs"
    >
      <div className="relative flex items-center justify-center w-full">
        <img
          src={p.img}
          alt={p.name}
          className="h-28 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
        />
        {/* Discount badge, if any */}
        {p.discount && (
          <span className="absolute top-2 right-2 bg-gradient-to-tr from-[#ac6cff] to-[#6129d9] text-xs font-bold text-white px-2 py-1 rounded-full shadow">
            {p.discount}% OFF
          </span>
        )}
      </div>
      <div className="text-center font-semibold text-base text-[#281478] leading-tight">{p.name}</div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-[#19c37d]">₹{p.price}</span>
        {p.oldPrice && (
          <span className="text-sm text-gray-400 line-through">₹{p.oldPrice}</span>
        )}
      </div>
      <button
        onClick={() => add(id)}
        className="w-full bg-gradient-to-tr from-[#ac6cff] to-[#6129d9] text-white rounded-xl px-0 py-2 text-sm font-semibold shadow transition hover:from-[#b388fd] hover:to-[#8264e7] active:scale-95 focus:outline-none"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}

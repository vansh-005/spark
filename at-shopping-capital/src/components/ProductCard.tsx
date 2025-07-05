import { useCart } from "../store/cart";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function ProductCard({ id }: { id: number }) {
  const p = products.find((x) => x.id === id)!;
  const add = useCart((s) => s.add);

  return (
    <motion.div
  whileHover={{ y: -6, boxShadow: "0 8px 32px rgba(0,113,220,0.09)" }}
  className="rounded-2xl border-2 border-blue-100 bg-white p-5 flex flex-col items-center gap-2 shadow hover:shadow-xl transition"
>
  <img src={p.img} alt={p.name} className="h-24 object-contain mb-1" />
  <div className="text-center text-base font-semibold text-blue-900">{p.name}</div>
  <div className="font-bold text-lg text-primary mb-1">₹{p.price}</div>
  <button
    onClick={() => add(id)}
    className="primary-bg text-white rounded-lg px-5 py-1.5 text-sm font-semibold shadow hover:bg-blue-800 transition"
  >
    Add
  </button>
</motion.div>

  );
}

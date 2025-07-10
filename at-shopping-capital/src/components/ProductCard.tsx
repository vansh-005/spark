import { useCart } from "../store/cart";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function ProductCard({ id }: { id: number }) {
  const p = products.find((x) => x.id === id)!;
  const add = useCart((s) => s.add);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "4px 4px 0 rgba(0,0,0,1)" }}
      className="brutal-card p-5 flex flex-col items-center gap-2 transition"
    >
      <img src={p.img} alt={p.name} className="h-24 object-contain mb-1" />
      <div className="text-center text-base font-semibold">{p.name}</div>
      <div className="font-bold text-lg text-primary mb-1">₹{p.price}</div>
      <button
        onClick={() => add(id)}
        className="brutal-button text-sm"
      >
        Add
      </button>
    </motion.div>

  );
}

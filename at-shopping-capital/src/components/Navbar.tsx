import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../store/cart";

export default function Navbar() {
  const count = useCart((s) => s.items.length);

  return (
    <header className="fixed top-0 left-0 w-full h-16 primary-bg flex items-center justify-between px-8 shadow-md">
  <Link to="/" className="text-2xl font-bold tracking-tight text-white drop-shadow">
    Cloud 9
  </Link>
  <nav className="flex gap-8 text-lg font-medium">
    <NavLink to="/" end className="text-white/90 hover:text-white underline-offset-4 hover:underline">Home</NavLink>
    <NavLink to="/missions" className="text-white/90 hover:text-white underline-offset-4 hover:underline">Missions</NavLink>
    <NavLink to="/profile" className="text-white/90 hover:text-white underline-offset-4 hover:underline">Profile</NavLink>
  </nav>
  <Link to="#" className="relative">
    <ShoppingCart size={24} color="white" />
    {count > 0 && (
      <span className="absolute -top-1 -right-2 text-xs bg-white text-primary font-bold w-5 h-5 rounded-full flex items-center justify-center border border-primary shadow">
        {count}
      </span>
    )}
  </Link>
</header>

  );
}

import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../store/cart";

export default function Navbar() {
  const count = useCart((s) => s.items.length);

  return (
     <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-2xl font-bold">Cloud 9</div>
        <nav className="ml-10">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-200 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Missions</a></li>
            <li><a href="#" className="hover:text-blue-200 transition">Profile</a></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-blue-800 font-bold">U</div>
      </div>
    </div>
  </header>

  );
}

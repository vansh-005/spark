import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <img
                  src="/logo.png" // Use your cropped icon path
                  alt="ShopWise Logo"
                  className="w-10 h-10 mr-3 rounded bg-white p-1 shadow"
                  draggable={false}
                />
                <span className="text-2xl font-bold tracking-tight">ShopWise</span>
            </h3>
            <p className="text-gray-400">
              Your one-stop destination for all your shopping needs. Quality products, fast delivery.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/missions" className="text-gray-400 hover:text-white transition">Missions</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition">Profile</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white transition">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Returns & Refunds</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 ShopWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
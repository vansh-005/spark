import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, GiftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg> 
    },
    { name: 'Missions', href: '/missions', icon: <GiftIcon className="h-5 w-5" /> },
    { name: 'Profile', href: '/profile', icon: <UserIcon className="h-5 w-5" /> },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
  <img
    src="/logo.png" // Use your cropped icon path
    alt="ShopWise Logo"
    className="w-10 h-10 mr-3 rounded bg-white p-1 shadow"
    draggable={false}
  />
  <span className="text-2xl font-bold tracking-tight">ShopWise</span>
</Link>

          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                to={item.href} 
                className={`flex items-center hover:text-blue-200 transition ${location.pathname === item.href ? 'font-bold border-b-2 border-white' : ''}`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className={`flex items-center py-2 px-4 rounded-lg ${location.pathname === item.href ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
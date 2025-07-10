import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import ChatBanner from '../components/ChatBanner';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen font-brutal">
      {/* Chat to Buy Banner (Prominent position below header) */}
      <div className="bg-brutalPink border-b-4 border-black py-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <div className="container mx-auto px-4">
          <ChatBanner />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-6">
        <ProductCarousel 
          title="Featured Products" 
          compact={true}
        />
      </div>

      {/* Shop By Category */}
      <div className="bg-brutalGray py-6 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4 text-center">Shop By Category</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              { name: 'Smartphones', icon: '📱', bg: 'bg-blue-100', color: 'text-blue-800' },
              { name: 'Laptops', icon: '💻', bg: 'bg-purple-100', color: 'text-purple-800' },
              { name: 'Fragrances', icon: '🌸', bg: 'bg-pink-100', color: 'text-pink-800' },
              { name: 'Skincare', icon: '🧴', bg: 'bg-green-100', color: 'text-green-800' },
              { name: 'Groceries', icon: '🛒', bg: 'bg-yellow-100', color: 'text-yellow-800' },
              { name: 'Home Decor', icon: '🏠', bg: 'bg-red-100', color: 'text-red-800' },
            ].map((category) => (
              <Link 
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`} 
                className={`brutal-card p-3 text-center`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <h3 className="font-medium text-xs">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Best Deals Section */}
      <div className="container mx-auto px-4 py-6">
        <ProductCarousel 
          title="Best Deals"
          category="smartphones" 
          compact={true}
        />
      </div>
    </div>
  );
};

export default Home;
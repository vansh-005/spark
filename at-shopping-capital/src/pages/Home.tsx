import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import ChatBanner from '../components/ChatBanner';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Chat to Buy Banner (Prominent position below header) */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-4">
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
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {[
    { name: 'Smartphones', icon: '📱', bg: 'from-blue-100 to-blue-50', color: 'text-blue-800' },
    { name: 'Laptops', icon: '💻', bg: 'from-purple-100 to-purple-50', color: 'text-purple-800' },
    { name: 'Fragrances', icon: '🌸', bg: 'from-pink-100 to-pink-50', color: 'text-pink-800' },
    { name: 'Skincare', icon: '🧴', bg: 'from-green-100 to-green-50', color: 'text-green-800' },
    { name: 'Groceries', icon: '🛒', bg: 'from-yellow-100 to-yellow-50', color: 'text-yellow-800' },
    { name: 'Home Decor', icon: '🏠', bg: 'from-red-100 to-red-50', color: 'text-red-800' },
  ].map((category) => (
    <Link
      key={category.name}
      to={`/category/${category.name.toLowerCase()}`}
      className={`
        bg-gradient-to-br ${category.bg} ${category.color}
        rounded-xl px-2 py-6 flex flex-col items-center justify-center gap-2 
        shadow-sm hover:shadow-xl hover:scale-105 focus:shadow-lg focus:scale-105
        transition-all duration-200 border-2 border-transparent hover:border-[#ac6cff] active:border-[#6129d9]
        group
      `}
      style={{ minHeight: 110 }}
    >
      <div className="text-4xl mb-1 transition-transform group-hover:scale-110 group-active:scale-95">{category.icon}</div>
      <h3 className="font-semibold text-base">{category.name}</h3>
    </Link>
  ))}
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
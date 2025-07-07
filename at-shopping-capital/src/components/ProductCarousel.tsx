import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/api';

interface ProductCarouselProps {
  title: string;
  category?: string;
  compact?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  title, 
  category,
  compact = false 
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        let data;
        if (category) {
          data = await (await fetch(`https://dummyjson.com/products/category/${category}?limit=6`)).json();
        } else {
          data = await (await fetch('https://dummyjson.com/products?limit=6')).json();
        }
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="text-blue-600 hover:text-blue-800 font-medium text-xs">
            View All
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded h-32 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link 
          to={category ? `/category/${category}` : '/products'} 
          className="text-blue-600 hover:text-blue-800 font-medium text-xs"
        >
          View All
        </Link>
      </div>
      
      <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-2`}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -2 }}
            className="bg-white rounded shadow-sm overflow-hidden border border-gray-100 hover:shadow transition-all"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative aspect-square">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-full object-cover p-1"
                  loading="lazy"
                />
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>
            </Link>
            <div className="p-1.5">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-medium text-xs text-gray-800 line-clamp-1">{product.title}</h3>
                {product.brand && <p className="text-[10px] text-gray-500 line-clamp-1">{product.brand}</p>}
              </Link>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <span className="text-xs font-bold text-green-600">${product.price.toFixed(2)}</span>
                  {product.discountPercentage && product.discountPercentage > 0 && (
                    <span className="text-[10px] line-through text-gray-400 ml-1">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price * (1 - (product.discountPercentage || 0) / 100),
                      quantity: 1,
                      image: product.thumbnail
                    });
                  }}
                  className="text-blue-600 hover:text-blue-800 text-[10px] font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
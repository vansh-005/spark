import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img src={image} alt={product.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">{product.rating.toFixed(1)} ({product.stock} in stock)</span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <>
                <span className="text-lg line-through text-gray-400 ml-2">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Details</h3>
            <ul className="space-y-1">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200">-</button>
              <span className="px-4">1</span>
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200">+</button>
            </div>
            <button 
              onClick={() => addToCart({
                id: product.id,
                name: product.title,
                price: product.price * (1 - (product.discountPercentage || 0) / 100),
                quantity: 1,
                image: product.thumbnail
              })}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
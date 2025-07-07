import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import { fetchProductsByCategory } from '../services/api';

const CategoryProducts: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(category!);
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Same product card as in ProductCarousel */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
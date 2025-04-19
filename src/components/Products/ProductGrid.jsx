import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Loader from '../UI/Loader';
import Alert from '../UI/Alert';
import api from '../../utils/api';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.get('products');
        
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API did not return an array of products:', data);
          // If data is not an array, set products as empty array
          setProducts([]);
          setError('Could not load products. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loader className="py-20" />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  // Ensure products is an array before checking length
  const productsArray = Array.isArray(products) ? products : [];
  
  if (!productsArray.length) {
    return (
      <div className="text-center py-10">
        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
        <p className="mt-1 text-gray-500">Check back later for fresh vegetables.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsArray.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 
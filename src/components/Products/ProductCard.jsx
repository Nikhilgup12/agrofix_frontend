import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../UI/Button';
import { DIRECT_API_URL } from '../../utils/api';

const ProductCard = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product.image_url) {
      setImageSrc(getImageUrl(product.image_url));
      console.log(`Setting image for ${product.name}: ${getImageUrl(product.image_url)}`);
    }
  }, [product.image_url]);

  // Function to handle image URL correctly
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    // If it's a full URL, ensure it uses HTTPS
    if (imageUrl.startsWith('http')) {
      // Convert http to https if needed
      return imageUrl.replace(/^http:\/\//i, 'https://');
    }

    // For relative paths starting with /uploads
    if (imageUrl.startsWith('/uploads')) {
      // Use the backend API URL but remove the /api part
      const baseUrl = DIRECT_API_URL.replace('/api', '');
      return `${baseUrl}${imageUrl}`;
    }

    // For other relative paths without leading slash
    if (!imageUrl.startsWith('/')) {
      // Use the backend API URL but remove the /api part
      const baseUrl = DIRECT_API_URL.replace('/api', '');
      return `${baseUrl}/${imageUrl}`;
    }

    // Default case, use a placeholder image
    return "https://via.placeholder.com/200x150?text=No+Image";
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate a small delay for UX
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
    }, 300);
  };

  const handleImageError = (e) => {
    console.error(`Failed to load image from: ${e.target.src}`);
    e.target.onerror = null; // Prevent infinite error loop
    e.target.src = "https://via.placeholder.com/200x150?text=No+Image"; // Use a placeholder image
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="relative pb-[70%] overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-primary mb-4 mt-auto">
          {formatCurrency(product.price)}
        </p>
        <Button
          onClick={handleAddToCart}
          isLoading={isAddingToCart}
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard; 
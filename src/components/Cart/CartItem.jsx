import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setIsUpdating(true);
      updateQuantity(item._id, value);
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const handleRemove = () => {
    removeFromCart(item._id);
  };

  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
        {item.image_url ? (
          <img
            src={item.image_url.startsWith('http') ? item.image_url : `${process.env.REACT_APP_API_URL}/../${item.image_url}`}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.price)} each
        </p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center border rounded">
          <button
            type="button"
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-10 text-center border-0 focus:outline-none focus:ring-0"
          />
          <button
            type="button"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800"
          >
            +
          </button>
        </div>
      </div>

      <div className="ml-4 flex items-center justify-end text-right">
        <p className="text-base font-medium text-gray-900 whitespace-nowrap">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          type="button"
          onClick={handleRemove}
          className="ml-4 text-gray-400 hover:text-red-500"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem; 
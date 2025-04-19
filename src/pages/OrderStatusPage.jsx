import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import OrderDetails from '../components/OrderStatus/OrderDetails';
import Button from '../components/UI/Button';

const OrderStatusPage = () => {
  const [searchParams] = useSearchParams();
  const urlOrderId = searchParams.get('id');
  
  const [orderId, setOrderId] = useState(urlOrderId || '');
  const [isSubmitted, setIsSubmitted] = useState(!!urlOrderId);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      
      {!isSubmitted ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <p className="mb-4 text-gray-600">
            Enter your order ID to check the current status of your order.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="orderId" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="input"
                placeholder="Enter your order ID"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={!orderId.trim()}
            >
              Track Order
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
            >
              ← Track another order
            </Button>
          </div>
          
          <OrderDetails orderId={orderId} />
        </div>
      )}
    </div>
  );
};

export default OrderStatusPage; 
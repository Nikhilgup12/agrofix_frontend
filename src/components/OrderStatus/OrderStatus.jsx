import { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderIdFromUrl = queryParams.get('orderId');
  
  // Get recent orders and last order ID from cart context
  const { recentOrders, getLastOrderId } = useCart();
  const lastOrderId = getLastOrderId();

  // If orderId is in the URL, use it for tracking
  useEffect(() => {
    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
      setTrackingStarted(true);
    } else if (lastOrderId) {
      // If no order ID in URL but we have a last order ID in localStorage, use that
      setOrderId(lastOrderId);
      setTrackingStarted(true);
    }
  }, [orderIdFromUrl, lastOrderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate order ID
    if (!orderId.trim()) {
      setValidationError('Please enter an order ID');
      return;
    }
    
    setValidationError('');
    setTrackingStarted(true);
    
    // Update URL with order ID for bookmarking
    navigate(`/order-status?orderId=${orderId}`, { replace: true });
  };

  const selectRecentOrder = (id) => {
    setOrderId(id);
    setTrackingStarted(true);
    navigate(`/order-status?orderId=${id}`, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Your Order</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
                    validationError ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your order ID"
                />
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Track Order
                </button>
              </div>
              {validationError && (
                <p className="mt-2 text-sm text-red-600">{validationError}</p>
              )}
            </div>
          </form>
          
          {/* Display recent orders if available */}
          {recentOrders && recentOrders.length > 0 && (
            <div className="mb-6 border-t pt-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Your Recent Orders</h3>
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      order.id === orderId ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => selectRecentOrder(order.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">{formatCurrency(order.total)}</p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {trackingStarted && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <OrderDetails orderId={orderId} />
            </div>
          )}
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h2>
          <p className="text-gray-600 mb-4">
            Use your order ID to track the status of your order. Your order ID was sent to you in your order confirmation email.
          </p>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">Order Status Meaning</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li><span className="font-medium">Pending</span>: Your order has been received but not yet processed.</li>
              <li><span className="font-medium">Processing</span>: Your order is being prepared for shipping.</li>
              <li><span className="font-medium">Shipped</span>: Your order has been shipped and is on its way.</li>
              <li><span className="font-medium">Delivered</span>: Your order has been delivered successfully.</li>
              <li><span className="font-medium">Cancelled</span>: Your order has been cancelled.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus; 
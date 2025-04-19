import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import Loader from '../UI/Loader';
import Alert from '../UI/Alert';

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`);
        
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? 'Order not found. Please check the order ID and try again.' 
            : 'Failed to fetch order details.');
        }
        
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return <Loader className="my-8" />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!order) {
    return null;
  }

  // Get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b px-4 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order #{order._id}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b">
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Delivery Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Customer</p>
            <p className="mt-1">{order.buyer_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contact</p>
            <p className="mt-1">{order.buyer_contact}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Delivery Address</p>
            <p className="mt-1">{order.delivery_address}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Order Items</h4>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            <p className="font-bold text-primary">{formatCurrency(calculateTotal())}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/UI/Button';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getLastOrderId } = useCart();
  
  // Get order ID from URL query params or localStorage
  const queryParams = new URLSearchParams(location.search);
  const orderIdFromUrl = queryParams.get('orderId');
  const orderId = orderIdFromUrl || getLastOrderId();
  
  // If no order ID is found, redirect to home
  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-bold">{orderId}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Please save your order ID for tracking. We've also saved this information for you and it will appear in your recent orders.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  A confirmation email will be sent to you with these details.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link to={`/order-status?orderId=${orderId}`}>
            <Button className="w-full">
              Track Your Order
            </Button>
          </Link>
          <Link to="/" className="text-center text-primary hover:text-primary-dark">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 
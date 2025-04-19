import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Alert from '../UI/Alert';
import api from '../../utils/api';

const OrderStatusUpdate = ({ order, onClose, onUpdate }) => {
  const { token } = useAuth();
  const [status, setStatus] = useState(order.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const formRef = useRef(null);

  // When the component mounts, log info for debugging
  useEffect(() => {
    console.log('OrderStatusUpdate opened for order:', order);
    console.log('Current token available:', token ? 'Yes' : 'No');
    // Force showing debugInfo in development
    setDebugInfo(`Order ID: ${order._id}, Current Status: ${order.status}`);
  }, [order, token]);

  const statusOptions = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (status === order.status) {
      onClose();
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      // Ensure we have a valid status
      if (!status) {
        setError("Status is required");
        return;
      }
      
      setDebugInfo(`Sending PUT request for order ${order._id} with status: ${status}`);
      console.log(`Updating order ${order._id} status to ${status}`);
      
      // Explicitly create the request body to ensure status is included
      const requestBody = { status: status };
      console.log('Request body:', requestBody);
      
      // Use the direct API URL to avoid proxy issues
      const response = await api.put(`orders/${order._id}`, requestBody, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        useDirect: true // This ensures we use the direct API URL
      });
      
      console.log('Status update successful:', response);
      
      // Update the UI and close the modal
      onUpdate(order._id, status);
      onClose();
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative approach using PATCH endpoint
  const handleAlternativeUpdate = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Ensure we have a valid status
      if (!status) {
        setError("Status is required");
        return;
      }
      
      setDebugInfo("Trying alternative endpoint (PATCH) for status update...");
      console.log(`Updating via PATCH endpoint for order ${order._id}`);
      
      // Explicitly create the request body to ensure status is included
      const requestBody = { status: status };
      console.log('Request body for PATCH:', requestBody);
      
      const response = await api.patch(`orders/${order._id}/status`, requestBody, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        useDirect: true // This ensures we use the direct API URL
      });
      
      console.log('Alternative update successful:', response);
      onUpdate(order._id, status);
      onClose();
    } catch (err) {
      console.error('Error in alternative update:', err);
      setError(`${err.message}. Please check browser console for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Update Order Status" onClose={onClose}>
      <div className="p-6">
        {error && (
          <div className="mb-4">
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError(null)} 
            />
            <button 
              onClick={handleAlternativeUpdate}
              className="mt-2 text-xs text-primary underline"
            >
              Try alternative method
            </button>
          </div>
        )}
        
        {debugInfo && (
          <div className="mb-4 p-2 bg-gray-100 text-xs font-mono rounded overflow-auto max-h-20">
            {debugInfo}
          </div>
        )}
        
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="status" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              disabled={status === order.status || isSubmitting}
            >
              Update Status
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OrderStatusUpdate; 
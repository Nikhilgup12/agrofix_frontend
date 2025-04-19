import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../UI/Button';
import Alert from '../UI/Alert';

const OrderForm = () => {
  const { cartItems, getTotalPrice, placeOrder, orderStatus } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    buyer_name: '',
    buyer_contact: '',
    delivery_address: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.buyer_name.trim()) {
      newErrors.buyer_name = 'Name is required';
    }
    
    if (!formData.buyer_contact.trim()) {
      newErrors.buyer_contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.buyer_contact.trim())) {
      newErrors.buyer_contact = 'Please enter a valid 10-digit contact number';
    }
    
    if (!formData.delivery_address.trim()) {
      newErrors.delivery_address = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await placeOrder({
        buyer_name: formData.buyer_name,
        buyer_contact: formData.buyer_contact,
        delivery_address: formData.delivery_address
      });
      
      if (result && result.id) {
        navigate(`/order-confirmation?orderId=${result.id}`);
      }
    } catch (err) {
      console.error('Order placement error:', err);
      // Error is handled by the cart context
    }
  };
  
  if (cartItems.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      
      {orderStatus.error && (
        <Alert 
          type="error" 
          message={orderStatus.error} 
          className="mb-4"
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="buyer_name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="buyer_name"
              name="buyer_name"
              value={formData.buyer_name}
              onChange={handleChange}
              className={`input mt-1 ${errors.buyer_name ? 'border-red-500' : ''}`}
            />
            {errors.buyer_name && (
              <p className="mt-1 text-sm text-red-600">{errors.buyer_name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="buyer_contact" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="buyer_contact"
              name="buyer_contact"
              value={formData.buyer_contact}
              onChange={handleChange}
              className={`input mt-1 ${errors.buyer_contact ? 'border-red-500' : ''}`}
            />
            {errors.buyer_contact && (
              <p className="mt-1 text-sm text-red-600">{errors.buyer_contact}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <textarea
              id="delivery_address"
              name="delivery_address"
              rows="3"
              value={formData.delivery_address}
              onChange={handleChange}
              className={`input mt-1 ${errors.delivery_address ? 'border-red-500' : ''}`}
            />
            {errors.delivery_address && (
              <p className="mt-1 text-sm text-red-600">{errors.delivery_address}</p>
            )}
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
            <p>Total</p>
            <p className="font-bold text-primary text-lg">{getTotalPrice()}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Shipping and taxes calculated at checkout.
          </p>
          <Button
            type="submit"
            className="w-full"
            isLoading={orderStatus.isLoading}
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm; 
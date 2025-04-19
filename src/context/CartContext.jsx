import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  
  const [orderStatus, setOrderStatus] = useState({
    isLoading: false,
    error: null,
    orderId: null,
    success: false,
  });

  // Store recent orders in state
  const [recentOrders, setRecentOrders] = useState(() => {
    const savedOrders = localStorage.getItem('recentOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save recent orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentOrders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Add a new order to recent orders
  const addToRecentOrders = (orderData) => {
    const newOrder = {
      id: orderData.id,
      date: new Date().toISOString(),
      total: getTotalPrice(),
      status: orderData.status || 'Pending'
    };

    setRecentOrders(prev => {
      // Keep only the 5 most recent orders
      const updatedOrders = [newOrder, ...prev].slice(0, 5);
      return updatedOrders;
    });
  };

  const placeOrder = async (orderDetails) => {
    setOrderStatus({
      isLoading: true,
      error: null,
      orderId: null,
      success: false,
    });

    try {
      const items = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const orderData = {
        ...orderDetails,
        items
      };

      console.log('Placing order with data:', orderData);
      const data = await api.post('orders', orderData);
      console.log('Order placed successfully:', data);

      // Store the order ID in localStorage for easy access
      localStorage.setItem('lastOrderId', data.id);
      
      // Add to recent orders
      addToRecentOrders(data);

      setOrderStatus({
        isLoading: false,
        error: null,
        orderId: data.id,
        success: true,
      });

      clearCart();
      return data;
    } catch (err) {
      console.error('Order placement failed:', err);
      setOrderStatus({
        isLoading: false,
        error: err.message || 'An error occurred while placing your order',
        orderId: null,
        success: false,
      });
      throw err;
    }
  };

  // Get the last order ID
  const getLastOrderId = () => {
    return localStorage.getItem('lastOrderId');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        placeOrder,
        orderStatus,
        recentOrders,
        getLastOrderId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 
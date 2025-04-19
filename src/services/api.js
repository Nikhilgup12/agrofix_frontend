const API_URL = process.env.REACT_APP_API_URL;

// Products API
export const productService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },
  
  create: async (productData, token) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: productData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },
  
  delete: async (productId, token) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
    return true;
  },
};

// Orders API
export const orderService = {
  getAll: async (token) => {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Authorization': token,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  },
  
  getById: async (orderId) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error('Failed to fetch order');
    }
    
    return response.json();
  },
  
  create: async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },
  
  updateStatus: async (orderId, status, token) => {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    
    return true;
  },
};

// Auth API
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    
    return data;
  },
}; 
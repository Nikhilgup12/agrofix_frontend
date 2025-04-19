/**
 * Mock data for when API connections fail
 * This provides fallback data to ensure the app remains functional 
 * even when the backend is unavailable
 */

// Mock Products
export const mockProducts = [
  {
    _id: 'mock1',
    name: 'Fresh Tomatoes',
    price: 80,
    image_url: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9tYXRvfGVufDB8fDB8fHww'
  },
  {
    _id: 'mock2',
    name: 'Organic Carrots',
    price: 50,
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww'
  },
  {
    _id: 'mock3',
    name: 'Green Spinach',
    price: 40,
    image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    _id: 'mock4',
    name: 'Cauliflower',
    price: 75,
    image_url: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F1bGlmbG93ZXJ8ZW58MHx8MHx8fDA%3D'
  },
  {
    _id: 'mock5',
    name: 'Bell Peppers',
    price: 90,
    image_url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVsbCUyMHBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    _id: 'mock6',
    name: 'Fresh Cucumber',
    price: 45,
    image_url: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VjdW1iZXJ8ZW58MHx8MHx8fDA%3D'
  },
  {
    _id: 'mock7',
    name: 'Green Beans',
    price: 60,
    image_url: 'https://images.unsplash.com/photo-1567375698818-5a3e7b1002ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBiZWFuc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    _id: 'mock8',
    name: 'Onions',
    price: 35,
    image_url: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25pb258ZW58MHx8MHx8fDA%3D'
  }
];

// Mock Orders
export const mockOrders = [
  {
    _id: 'order1',
    buyer_name: 'Demo User',
    buyer_contact: '9876543210',
    delivery_address: '123 Test Street, Demo City',
    status: 'Delivered',
    items: [
      { name: 'Fresh Tomatoes', price: 80, quantity: 2 },
      { name: 'Organic Carrots', price: 50, quantity: 1 }
    ]
  }
];

export default {
  products: mockProducts,
  orders: mockOrders
}; 
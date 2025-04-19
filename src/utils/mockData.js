// Mock Products
export const mockProducts = [
  {
    _id: "product1",
    name: "Fresh Tomatoes",
    price: 60,
    image_url: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "product2",
    name: "Spinach",
    price: 40,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "product3",
    name: "Bell Peppers",
    price: 80,
    image_url: "https://images.unsplash.com/photo-1563565375-f0d78ecaf5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "product4",
    name: "Carrots",
    price: 50,
    image_url: "https://images.unsplash.com/photo-1598170845056-d762772c4af8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "product5",
    name: "Broccoli",
    price: 70,
    image_url: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "product6",
    name: "Potatoes",
    price: 30,
    image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
];

// Mock Orders
export const mockOrders = [
  {
    _id: "order1",
    buyer_name: "Rahul Sharma",
    buyer_contact: "9876543210",
    delivery_address: "123 Main Street, Mumbai, Maharashtra",
    status: "Delivered",
    items: [
      {
        product: "product1",
        name: "Fresh Tomatoes",
        price: 60,
        quantity: 2
      },
      {
        product: "product3",
        name: "Bell Peppers",
        price: 80,
        quantity: 1
      }
    ],
    createdAt: "2023-04-15T10:30:00.000Z"
  },
  {
    _id: "order2",
    buyer_name: "Priya Singh",
    buyer_contact: "8765432109",
    delivery_address: "456 Park Avenue, Delhi, Delhi",
    status: "Processing",
    items: [
      {
        product: "product2",
        name: "Spinach",
        price: 40,
        quantity: 3
      },
      {
        product: "product5",
        name: "Broccoli",
        price: 70,
        quantity: 2
      },
      {
        product: "product6",
        name: "Potatoes",
        price: 30,
        quantity: 5
      }
    ],
    createdAt: "2023-04-16T14:20:00.000Z"
  },
  {
    _id: "order3",
    buyer_name: "Amit Patel",
    buyer_contact: "7654321098",
    delivery_address: "789 Garden Road, Bangalore, Karnataka",
    status: "Pending",
    items: [
      {
        product: "product4",
        name: "Carrots",
        price: 50,
        quantity: 2
      },
      {
        product: "product1",
        name: "Fresh Tomatoes",
        price: 60,
        quantity: 3
      }
    ],
    createdAt: "2023-04-17T09:15:00.000Z"
  }
]; 
# AgroFix - Vegetable Selling Frontend

A modern React application for an online vegetable selling platform. This project allows customers to browse products, add them to cart, place orders, and track their order status. It also includes an admin dashboard for managing products and order fulfillment.

## Features

- **Product Browsing**: View all available vegetables with images, descriptions, and prices
- **Shopping Cart**: Add/remove items, adjust quantities, and see total price
- **Order Placement**: Fill delivery details and place orders
- **Order Tracking**: Track the status of placed orders
- **Admin Dashboard**: Manage products and order statuses (protected with authentication)

## Tech Stack

- React (with React Hooks)
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management
- Modern ES6+ JavaScript

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cart/            # Cart-related components
│   ├── Dashboard/       # Admin dashboard components 
│   ├── Layout/          # Layout components (Header, Footer, etc.)
│   ├── OrderStatus/     # Order tracking components
│   ├── Products/        # Product listing components
│   └── UI/              # Reusable UI elements (Button, Modal, etc.)
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services
└── utils/               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm start
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Authentication

For the admin dashboard, use the following credentials:
- email: "admin@agrofix.com",
- password: "admin123" 
## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from create-react-app

## License

This project is released under the MIT License. 
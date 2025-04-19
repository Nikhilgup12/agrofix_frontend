# Agrofix - Fresh Vegetable E-Commerce Platform

## 🌱 Live Demo

**Frontend:** [https://agrofix-frontend-five.vercel.app/](https://agrofix-frontend-five.vercel.app/)  
**Backend API:** [https://agrofix-backend-ll61.onrender.com/api](https://agrofix-backend-ll61.onrender.com/api)

### Demo Credentials

**Admin Access:**
- Email: admin@agrofix.com
- Password: admin123

## 📋 Project Overview

Agrofix is a full-stack e-commerce platform designed for selling fresh, locally sourced vegetables. The application connects farmers directly with consumers, providing an easy-to-use interface for browsing products, managing shopping carts, and placing orders. Administrators can manage products and track order statuses through a dedicated dashboard.

## ✨ Key Features

### Customer Features
- **Product Browsing**: Browse through a catalog of fresh vegetables with detailed information
- **Shopping Cart**: Add products to cart with quantity management and persistent storage
- **Checkout Process**: Simple order placement with delivery information
- **Order Tracking**: Track orders using order ID with real-time status updates
- **Order History**: View past orders and their statuses
- **Responsive Design**: Fully responsive interface that works on mobile and desktop devices

### Admin Features
- **Product Management**: Add, edit, and delete products from the inventory
- **Order Management**: View and update order statuses
- **Dashboard**: Overview of sales and inventory
- **Authentication**: Secure admin login system

## 🛠️ Technology Stack

### Frontend
- **React.js**: UI library for building component-based interfaces
- **React Router**: For navigation and routing
- **Context API**: For state management (auth, cart, etc.)
- **Tailwind CSS**: For responsive and modern UI design
- **Vercel**: For frontend deployment

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for building the API
- **MongoDB**: NoSQL database for data storage
- **JWT**: For secure authentication
- **Render**: For backend deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Nikhilgup12/agrofix_frontend.git
   cd agrofix_frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   REACT_APP_API_URL=/api
   REACT_APP_DIRECT_API_URL=https://agrofix-backend-ll61.onrender.com/api
   ```

4. Start the development server
   ```bash
   npm start
   ```

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Nikhilgup12/agrofix_backend.git
   cd agrofix_backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   MONGODB_URI=mongodb+srv://<your-mongodb-url>
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server
   ```bash
   npm start
   ```

## 🧪 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details by ID
- `PATCH /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)

### Authentication
- `POST /api/auth/login` - Login for admin users
- `GET /api/auth/verify` - Verify JWT token

## 📚 Architecture

The application follows a client-server architecture with a RESTful API. The frontend is built with React.js, utilizing context API for state management. The backend is developed with Node.js and Express, with MongoDB as the database.

### Data Flow
1. Frontend makes HTTP requests to the backend API
2. Backend processes the requests, interacts with the database, and returns responses
3. Frontend updates the UI based on the responses

## 🔒 Security Features

- JWT-based authentication for admin access
- Protected routes on both frontend and backend
- Sanitized inputs to prevent injection attacks
- CORS configuration to control API access
- HTTPS for secure data transmission

## 🚧 Future Improvements

- Payment gateway integration
- User account creation and management
- Product reviews and ratings
- Email notifications for order updates
- Advanced filtering and search functionality
- Analytics dashboard for business insights

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

Nikhil Gupta - Full Stack Developer

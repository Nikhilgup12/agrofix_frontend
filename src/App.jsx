import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderStatusPage from './pages/OrderStatusPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import testApiConnectivity from './utils/apiTest';

function App() {
  useEffect(() => {
    // Run the API connectivity test in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      testApiConnectivity();
    } else {
      console.log('Running in production mode');
      console.log('API_URL:', process.env.REACT_APP_API_URL);
      console.log('DIRECT_API_URL:', process.env.REACT_APP_DIRECT_API_URL);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-status" element={<OrderStatusPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 
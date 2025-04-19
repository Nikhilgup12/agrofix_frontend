import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = ({ className = '' }) => {
  const { isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`bg-primary text-white shadow-md ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <span className="text-secondary-light mr-1">Agro</span>Fix
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="hover:text-secondary-light transition-colors"
            >
              Home
            </Link>
            
            <Link 
              to="/order-status" 
              className="hover:text-secondary-light transition-colors"
            >
              Track Order
            </Link>
            
            <Link 
              to="/cart" 
              className="relative hover:text-secondary-light transition-colors"
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="hover:text-secondary-light transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-secondary-light transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="hover:text-secondary-light transition-colors"
              >
                Admin Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 
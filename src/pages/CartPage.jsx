import { useCart } from '../hooks/useCart';
import CartItem from '../components/Cart/CartItem';
import OrderForm from '../components/Cart/OrderForm';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">
            Browse our fresh selection and add items to your cart.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Cart Items ({getTotalItems()})
                </h3>
              </div>
              <div className="p-4">
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatCurrency(getTotalPrice())}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping calculated at checkout.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <OrderForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 
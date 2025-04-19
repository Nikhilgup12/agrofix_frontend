import { useState } from 'react';
import ProductList from '../components/Dashboard/ProductList';
import OrderList from '../components/Dashboard/OrderList';
import AddProductForm from '../components/Dashboard/AddProductForm';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const handleProductAdded = () => {
    setShowAddProduct(false);
  };
  
  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
  ];
  
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'orders' && <OrderList />}
        
        {activeTab === 'products' && (
          showAddProduct ? (
            <AddProductForm 
              onSuccess={handleProductAdded}
              onCancel={() => setShowAddProduct(false)}
            />
          ) : (
            <ProductList onAddProduct={() => setShowAddProduct(true)} />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 
import ProductGrid from '../components/Products/ProductGrid';

const HomePage = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Vegetables</h1>
        <p className="text-lg text-gray-600">
          Locally sourced, farm-fresh vegetables delivered to your doorstep
        </p>
      </div>
      
      <ProductGrid />
    </div>
  );
};

export default HomePage; 
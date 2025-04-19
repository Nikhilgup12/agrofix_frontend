const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-primary text-white py-4 mt-auto ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <h3 className="text-lg font-bold">
              <span className="text-secondary-light">Agro</span>Fix
            </h3>
            <p className="text-xs">Fresh vegetables delivered to your doorstep</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs">
              &copy; {currentYear} AgroFix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
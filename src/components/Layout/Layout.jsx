import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="flex-shrink-0" />
      <main className="flex-grow container mx-auto px-4 py-4 overflow-auto">
        {children}
      </main>
      <Footer className="flex-shrink-0" />
    </div>
  );
};

export default Layout; 
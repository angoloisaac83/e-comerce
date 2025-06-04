// src/components/Layout.js
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Layout = ({ children }) => {
  const { cart, getCartItemCount, searchQuery, setSearchQuery } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-bold text-indigo-600">ShopEase</Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8">
              <form onSubmit={handleSearch} className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={20} />
                </button>
              </form>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-gray-600 hover:text-indigo-600 relative"
                onClick={() => navigate('/cart')}
              >
                <FiShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={20} />
                </button>
              </form>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="px-2 py-1 text-gray-700 hover:text-indigo-600">Home</Link>
                <Link to="/" className="px-2 py-1 text-gray-700 hover:text-indigo-600">Shop</Link>
                <Link to="/" className="px-2 py-1 text-gray-700 hover:text-indigo-600">Categories</Link>
                <Link to="/" className="px-2 py-1 text-gray-700 hover:text-indigo-600">About</Link>
                <Link to="/" className="px-2 py-1 text-gray-700 hover:text-indigo-600">Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer remains the same */}<footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopEase</h3>
              <p className="text-gray-400">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Shop</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">FAQs</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Returns & Refunds</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Shopping Street</p>
                <p>E-Commerce City, EC 12345</p>
                <p className="mt-2">Email: info@shopease.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

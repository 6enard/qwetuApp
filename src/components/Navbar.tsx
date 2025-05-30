import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">HostelHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              <Search size={20} />
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700 hover:text-blue-600" size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700" size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Products
            </Link>
            <div className="relative mt-3 mb-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-2 border rounded-lg"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
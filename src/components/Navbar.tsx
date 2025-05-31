import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  // Dropdown state
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Ref for clicking outside to close dropdown
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menus on route change
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Close user menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-orange-600">QWETUHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-fuchsia-800 font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-fuchsia-800 font-medium">
                Products
              </Link>
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search */}
              <Link to="/products" className="text-gray-700 hover:text-fuchsia-800">
                <Search size={20} />
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-fuchsia-800 focus:outline-none"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-fuchsia-800 font-medium"
                >
                  Sign In
                </button>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="text-gray-700 hover:text-fuchsia-800" size={22} />
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
                className="block py-2 text-gray-700 hover:text-fuchsia-800 font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block py-2 text-gray-700 hover:text-fuchsia-800 font-medium"
              >
                Products
              </Link>
              <div className="relative mt-3 mb-2">
                <Link to="/products" className="text-gray-700 hover:text-fuchsia-800">
                  <Search size={20} />
                </Link>
              </div>
              {user ? (
                <>
                  <div className="py-2 text-gray-700 font-medium">
                    {user.email?.split('@')[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-gray-700 hover:text-fuchsia-800 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block py-2 text-gray-700 hover:text-fuchsia-800 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

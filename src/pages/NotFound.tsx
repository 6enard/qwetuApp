import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page not found</p>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary inline-flex items-center">
        <Home size={18} className="mr-2" />
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
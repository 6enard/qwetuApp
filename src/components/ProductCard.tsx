import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    addItem(product, 1);
  };

  return (
    <div 
      className={`card group overflow-hidden ${
        featured ? 'border-2 border-blue-100' : ''
      }`}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {featured && (
            <span className="absolute top-2 right-2 badge bg-blue-500 text-white">
              Featured
            </span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-2 left-2 badge bg-red-500 text-white">
              Low Stock
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-gray-900">KES {product.price}</span>
            <div className="flex space-x-2">
              <Link
                to={`/products/${product.id}`}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <Info size={18} />
              </Link>
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // ✅ Import AuthContext
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { user } = useAuth(); // ✅ Get current user

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl mb-4">Product not found</p>
        <button
          onClick={() => navigate('/products')}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      navigate("/login"); // ✅ Redirect to login if not authenticated
      return;
    }

    addItem(product, quantity); // ✅ Only add if authenticated
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prevQty => prevQty + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="h-80 md:h-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="mb-2">
              <span className="badge bg-blue-100 text-blue-800">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

            <div className="text-2xl font-bold text-gray-900 mb-4">
              KES {product.price}
            </div>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  max={product.stock}
                />

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`btn w-full sm:w-auto flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

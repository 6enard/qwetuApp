import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Cart Items ({totalItems})</h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <Link to={`/products/${item.product.id}`} className="font-medium text-lg hover:text-blue-600">
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm mb-2">
                        KES {item.product.price} each
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                          max={item.product.stock}
                        />
                        
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right font-bold">
                      KES {item.product.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>KES {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>KES 50</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>KES {totalPrice + 50}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="btn btn-primary w-full">
                Proceed to Checkout
              </Link>
              
              <Link to="/products" className="mt-4 block text-center text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
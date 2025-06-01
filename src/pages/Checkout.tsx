import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Phone, User, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomNumber: '',
    hostel: 'Qwetu Ruaraka', // Default hostel
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user?.uid, // Add userId to the order
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity
        })),
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          roomNumber: formData.roomNumber,
          hostel: formData.hostel
        },
        status: 'pending',
        trackingStatus: 'order_placed',
        trackingUpdates: [{
          status: 'order_placed',
          timestamp: new Date().toISOString(),
          message: 'Order has been placed successfully'
        }],
        totalAmount: totalPrice + 50, // Including delivery fee
        createdAt: new Date().toISOString()
      });

      await clearCart();
      navigate(`/confirmation/${orderRef.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const isFormValid = formData.name && formData.phone && formData.roomNumber;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number (M-Pesa)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07XX XXX XXX"
                      className="input pl-10"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    This is the number that will receive the M-Pesa payment request
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hostel" className="block text-gray-700 font-medium mb-2">
                      Hostel Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="hostel"
                        name="hostel"
                        value={formData.hostel}
                        readOnly
                        className="input pl-10 bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">
                      Room Number
                    </label>
                    <input
                      type="text"
                      id="roomNumber"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      placeholder="e.g. A123"
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CreditCard size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">M-Pesa STK Push</p>
                    <p className="text-sm text-green-700">
                      You will receive a payment prompt on your phone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-2">
                    <span className="text-gray-600">
                      {item.quantity} x {item.product.name}
                    </span>
                    <span>KES {item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 border-t pt-3">
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
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid || isProcessing}
                className={`btn w-full ${
                  isFormValid && !isProcessing 
                  ? 'btn-primary' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Complete Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
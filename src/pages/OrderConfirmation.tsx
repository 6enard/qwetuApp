import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Clock, Home, Download } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    // Simulate order progress updates
    const timer1 = setTimeout(() => setCurrentStep(2), 3000);
    const timer2 = setTimeout(() => setCurrentStep(3), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const generateReceipt = () => {
    const receipt = `
QWETUHub Receipt
-----------------
Order #${orderId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Thank you for shopping with QWETUHub!
We appreciate your business and hope to serve you again soon.

Visit us at www.qwetuhub.com for more great deals!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QWETUHub-Receipt-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6">
            Your order #{orderId} has been placed successfully. We appreciate your business!
          </p>
          
          {/* Order Status */}
          <div className="mb-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="h-1 bg-gray-200 absolute top-6 left-1/2 transform -translate-x-1/2 w-4/5"></div>
              
              {/* Progress Fill */}
              <div 
                className="h-1 bg-green-500 absolute top-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out" 
                style={{ width: `${(currentStep - 1) * 40}%` }}
              ></div>
              
              {/* Steps */}
              <div className="flex justify-between relative">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <CheckCircle size={24} />
                  </div>
                  <span className="text-sm font-medium">Confirmed</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Package size={24} />
                  </div>
                  <span className="text-sm font-medium">Preparing</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= 3 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Home size={24} />
                  </div>
                  <span className="text-sm font-medium">Delivered</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-left mb-6">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
              <Clock size={18} className="mr-2" />
              Estimated Delivery Time
            </h3>
            <p className="text-blue-700">
              Your order will be delivered to your room in approximately 15-30 minutes.
            </p>
          </div>

          {/* Download Receipt Button */}
          <button
            onClick={generateReceipt}
            className="btn btn-secondary w-full mb-4 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Receipt
          </button>
          
          <div className="mt-8 space-x-4">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
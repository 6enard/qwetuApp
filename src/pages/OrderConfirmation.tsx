import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Clock, Home, Download } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
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
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Your order <span className="font-semibold">#{orderId}</span> has been placed successfully.
          </p>

          {/* Order Status */}
          <div className="mb-10">
            <div className="relative">
              <div className="h-1 bg-gray-200 absolute top-6 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-4/5"></div>

              <div
                className="h-1 bg-green-500 absolute top-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep - 1) * 40}%` }}
              ></div>

              <div className="flex justify-between relative px-2 sm:px-4">
                {[
                  { label: 'Confirmed', icon: <CheckCircle size={24} /> },
                  { label: 'Preparing', icon: <Package size={24} /> },
                  { label: 'Delivered', icon: <Home size={24} /> },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-xs sm:text-sm w-1/3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                        currentStep >= i + 1
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 rounded-lg p-4 text-left mb-6">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center text-sm sm:text-base">
              <Clock size={18} className="mr-2" />
              Estimated Delivery Time
            </h3>
            <p className="text-blue-700 text-sm sm:text-base">
              Your order will be delivered to your room in approximately 15–30 minutes.
            </p>
          </div>

          {/* Download Receipt */}
          <button
            onClick={generateReceipt}
            className="btn btn-secondary w-full sm:w-auto mb-6 sm:mb-4 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Receipt
          </button>

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
            <Link to="/" className="btn btn-primary text-center">
              Return to Home
            </Link>
            <Link to="/products" className="btn btn-secondary text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

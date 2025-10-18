import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const { amount, transactionId } = location.state || { 
    amount: 0, 
    transactionId: 'UNKNOWN' 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">
              Amount Paid: <span className="font-semibold">₹{amount.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-500">
              Transaction ID: {transactionId}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-6">
              Thank you for your payment. A confirmation email has been sent to your registered email address.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
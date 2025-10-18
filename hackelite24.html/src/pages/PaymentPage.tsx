import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import { QRCodeDisplay } from '../components/PaymentInterface/QRCode';
import { PaymentStatus } from '../components/PaymentInterface/PaymentStatus';
import { UPIInput } from '../components/PaymentInterface/UPIInput';
import { PaymentTimer } from '../components/PaymentInterface/PaymentTimer';
import { PaymentInstructions } from '../components/PaymentInterface/PaymentInstructions';
import { processMockPayment } from '../utils/mockPayment';

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState('');
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [message, setMessage] = useState('Waiting for payment...');

  const amount = 1499.99;
  const transactionId = 'MOCK' + Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        navigate('/success', {
          state: {
            amount,
            transactionId,
          },
        });
      }, 1500); // Short delay to show success message before redirect

      return () => clearTimeout(timer);
    }
  }, [status, navigate, amount, transactionId]);

  const handlePayment = async () => {
    setStatus('pending');
    setMessage('Processing payment...');

    try {
      const result = await processMockPayment(amount);
      setStatus(result.success ? 'success' : 'failed');
      setMessage(result.message);
    } catch (error) {
      setStatus('failed');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleTimeout = () => {
    setStatus('failed');
    setMessage('Payment session timed out. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <IndianRupee className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 ml-2">Mock Pay</h1>
          </div>
          <p className="text-gray-600">Secure Payment Gateway</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Amount to Pay</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">₹{amount.toFixed(2)}</p>
              </div>
              <QRCodeDisplay amount={amount} transactionId={transactionId} />
              <PaymentTimer duration={300} onTimeout={handleTimeout} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <PaymentStatus status={status} message={message} />
              <UPIInput
                value={upiId}
                onChange={setUpiId}
                onSubmit={handlePayment}
              />
              <PaymentInstructions />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-600">
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
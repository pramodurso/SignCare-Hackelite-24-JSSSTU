import React from 'react';
import { Smartphone, QrCode, CheckCircle } from 'lucide-react';

export const PaymentInstructions: React.FC = () => {
  const steps = [
    {
      icon: Smartphone,
      title: 'Open UPI App',
      description: 'Open your preferred UPI payment app on your smartphone',
    },
    {
      icon: QrCode,
      title: 'Scan QR Code',
      description: 'Scan the QR code displayed above or enter UPI ID manually',
    },
    {
      icon: CheckCircle,
      title: 'Confirm Payment',
      description: 'Verify the amount and complete the payment in your UPI app',
    },
  ];

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Pay</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <step.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
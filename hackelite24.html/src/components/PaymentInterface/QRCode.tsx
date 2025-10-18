import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeProps {
  amount: number;
  transactionId: string;
}

export const QRCodeDisplay: React.FC<QRCodeProps> = ({ amount, transactionId }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <div className="w-48 h-48 border-2 border-gray-200 rounded-lg flex items-center justify-center">
        <QrCode size={160} className="text-gray-800" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Scan to pay ₹{amount.toFixed(2)}</p>
        <p className="text-xs text-gray-500">Transaction ID: {transactionId}</p>
      </div>
    </div>
  );
};
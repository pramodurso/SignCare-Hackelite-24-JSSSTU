import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

type Status = 'pending' | 'success' | 'failed';

interface PaymentStatusProps {
  status: Status;
  message: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, message }) => {
  const statusConfig = {
    pending: { icon: Loader, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    success: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50' },
    failed: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
  };

  const { icon: Icon, color, bgColor } = statusConfig[status];

  return (
    <div className={`flex items-center p-4 ${bgColor} rounded-lg`}>
      <Icon className={`${color} ${status === 'pending' ? 'animate-spin' : ''} mr-2`} size={24} />
      <span className={`${color} font-medium`}>{message}</span>
    </div>
  );
};
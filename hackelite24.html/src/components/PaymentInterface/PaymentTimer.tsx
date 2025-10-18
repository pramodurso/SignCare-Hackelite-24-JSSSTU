import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface PaymentTimerProps {
  duration: number; // in seconds
  onTimeout: () => void;
}

export const PaymentTimer: React.FC<PaymentTimerProps> = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center text-gray-600">
      <Timer size={20} className="mr-2" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
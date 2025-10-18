// Simulates a payment processing delay and random success/failure
export const processMockPayment = (amount: number): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
    const success = Math.random() > 0.3; // 70% success rate

    setTimeout(() => {
      if (success) {
        resolve({
          success: true,
          message: `Payment of ₹${amount.toFixed(2)} successful!`,
        });
      } else {
        resolve({
          success: false,
          message: 'Payment failed. Please try again.',
        });
      }
    }, delay);
  });
};
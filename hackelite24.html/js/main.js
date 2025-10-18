document.addEventListener('DOMContentLoaded', () => {
    const paymentProcessor = new PaymentProcessor();
    const amount = 1499.99;

    // Initialize timer
    const timer = new PaymentTimer(300, () => {
        paymentProcessor.updateStatus('error', 'Payment session timed out. Please try again.');
    });
    timer.start();

    // Handle payment button click
    document.getElementById('pay-button').addEventListener('click', async () => {
        const upiInput = document.getElementById('upi');
        const upiId = upiInput.value.trim();

        if (!upiId) {
            paymentProcessor.updateStatus('error', 'Please enter a valid UPI ID');
            return;
        }

        const success = await paymentProcessor.processPayment(amount);
        
        if (success) {
            timer.stop();
            // Redirect to success page after a brief delay
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1500);
        }
    });
});
class PaymentProcessor {
    constructor() {
        this.statusElement = document.getElementById('payment-status');
        this.statusMessageElement = document.getElementById('status-message');
    }

    async processPayment(amount) {
        this.updateStatus('pending', 'Processing payment...');

        try {
            const result = await this.mockPaymentProcess();
            
            if (result.success) {
                this.updateStatus('success', result.message);
                return true;
            } else {
                this.updateStatus('error', result.message);
                return false;
            }
        } catch (error) {
            this.updateStatus('error', 'An error occurred. Please try again.');
            return false;
        }
    }

    updateStatus(status, message) {
        this.statusElement.className = `payment-status ${status}`;
        this.statusMessageElement.textContent = message;
    }

    mockPaymentProcess() {
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 1000; // 1-3 seconds delay
            const success = Math.random() > 0.3; // 70% success rate

            setTimeout(() => {
                if (success) {
                    resolve({
                        success: true,
                        message: 'Payment successful!'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Payment failed. Please try again.'
                    });
                }
            }, delay);
        });
    }
}
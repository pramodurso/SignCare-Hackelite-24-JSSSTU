class PaymentTimer {
    constructor(duration, onTimeout) {
        this.duration = duration;
        this.onTimeout = onTimeout;
        this.timeLeft = duration;
        this.timerId = null;
    }

    start() {
        this.updateDisplay();
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.stop();
                this.onTimeout();
            }
        }, 1000);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('countdown').textContent = display;
    }

    reset() {
        this.stop();
        this.timeLeft = this.duration;
        this.updateDisplay();
        this.start();
    }
}
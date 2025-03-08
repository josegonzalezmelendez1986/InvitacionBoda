document.addEventListener('DOMContentLoaded', function() {
    // Allow touch events to propagate for scrolling
    document.addEventListener('touchmove', function(event) {
        // event.stopPropagation(); // Commented out to allow default scrolling
    }, { passive: true });

    // Set the wedding date to November 2, 2025 at 16:00 (4:00 PM)
    const weddingDate = new Date("November 2, 2025 16:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");
        
        if (timeLeft < 0) {
            countdownElement.innerHTML = "¡Es el día de la boda! 💍";
            clearInterval(countdownFunction); // Stop the countdown
            return; // Exit the function
        }

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">días</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">segundos</span>
            </div>
        `;
    }

    // Update countdown immediately and then every second
    updateCountdown();
    const countdownFunction = setInterval(updateCountdown, 1000);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simplify the fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px' // Start animation slightly before the section comes into view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in class with a small delay to prevent jumps
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only observe sections that should animate
    document.querySelectorAll('.animate-section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Photo sharing button animation
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)'; // Feedback on touch
        });

        shareButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)'; // Reset after touch
        });
    }

    // Optional: Add touch event listeners for buttons if needed
    document.querySelectorAll('.rsvp-button, .share-button').forEach(button => {
        button.addEventListener('touchstart', function() {
            // Add any touch-specific behavior here if needed
        });
    });
});
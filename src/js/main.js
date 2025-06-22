// This file contains the main JavaScript code for the website, handling general interactivity.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize any interactive elements or event listeners here

    const rsvpButton = document.getElementById('rsvp-button');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', () => {
            // Logic to open RSVP form or navigate to RSVP section
            alert('RSVP form will be opened.');
        });
    }

    const galleryButton = document.getElementById('gallery-button');
    if (galleryButton) {
        galleryButton.addEventListener('click', () => {
            // Logic to display gallery or navigate to gallery section
            alert('Gallery will be displayed.');
        });
    }

    // Additional interactivity can be added here

    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Improve hover states on touch devices
        const clickableElements = document.querySelectorAll('a, button, .gallery-item');
        clickableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, { passive: true });
        });
    }
    
    // Handle viewport height issues on mobile browsers
    const setViewportHeight = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    setViewportHeight();
});
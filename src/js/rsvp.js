document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvp-form');
    const responseMessage = document.getElementById('response-message');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = document.getElementById('submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';
            
            // Collect form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Send data via AJAX
            fetch('/submit-rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                if (data.success) {
                    // Show success message
                    responseMessage.classList.add('success');
                    responseMessage.textContent = data.message;
                    
                    // Reset the form
                    rsvpForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        responseMessage.textContent = '';
                        responseMessage.classList.remove('success');
                    }, 5000);
                } else {
                    // Show error message
                    responseMessage.classList.add('error');
                    responseMessage.textContent = data.message;
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        responseMessage.textContent = '';
                        responseMessage.classList.remove('error');
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show error message
                responseMessage.classList.add('error');
                responseMessage.textContent = 'Có lỗi xảy ra, vui lòng thử lại sau.';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    responseMessage.textContent = '';
                    responseMessage.classList.remove('error');
                }, 5000);
            });
        });
    }
});
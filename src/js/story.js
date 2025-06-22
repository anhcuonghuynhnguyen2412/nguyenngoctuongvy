// Story Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const storyLink = document.querySelector('.nav-right a[href="#story"]');
    const storyModal = document.getElementById('story-modal');
    const closeStory = document.querySelector('.close-story');
    
    if (storyLink && storyModal) {
        // Show modal when clicking the My Story link
        storyLink.addEventListener('click', function(event) {
            event.preventDefault();
            storyModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling of background
        });
        
        // Close modal when clicking the close button
        if (closeStory) {
            closeStory.addEventListener('click', function() {
                storyModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === storyModal) {
                storyModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && storyModal.style.display === 'block') {
                storyModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const detailsImage = document.querySelector('.details-image-frame');
    const heroImage = document.querySelector('.hero-image-frame');
    
    // Thêm animation cho gallery khi scroll đến
    if (window.IntersectionObserver) {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, entry.target.dataset.delay || 0);
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});
        
        galleryItems.forEach((item, index) => {
            // Thêm delay tăng dần cho từng item
            item.dataset.delay = index * 200;
            observer.observe(item);
        });
        
        // Thêm observer cho hình ảnh trong details section
        if (detailsImage) {
            let detailsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-image');
                        detailsObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.3});
            
            detailsObserver.observe(detailsImage);
        }
    } else {
        // Fallback cho trình duyệt không hỗ trợ IntersectionObserver
        galleryItems.forEach(item => {
            item.classList.add('visible');
        });
        if (detailsImage) detailsImage.classList.add('animate-image');
    }
});
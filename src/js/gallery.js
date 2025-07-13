document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded!');
    
    // 1. Animation cho gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
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
            item.dataset.delay = index * 100;
            observer.observe(item);
        });
    } else {
        galleryItems.forEach(item => item.classList.add('visible'));
    }
    
    // 2. Lightbox Modal
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    // Lấy tất cả images
    const allImages = Array.from(document.querySelectorAll('.gallery-item .image-arch img'));
    console.log('Found images:', allImages.length);
    let currentIndex = 0;
    
    // Hiển thị modal
    function openModal(index) {
        console.log('Opening modal with index:', index);
        
        currentIndex = index;
        showImage(currentIndex);
        
        // Tính toán vị trí modal dựa trên scroll position
        updateModalPosition();
        
        // Force hiển thị modal bằng cách set CSS trực tiếp
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('position', 'absolute', 'important');
        modal.style.setProperty('width', '100%', 'important');
        modal.style.setProperty('height', '100vh', 'important');
        modal.style.setProperty('background', 'rgba(0, 0, 0, 0.9)', 'important');
        modal.style.setProperty('z-index', '99999', 'important');
        modal.style.setProperty('justify-content', 'center', 'important');
        modal.style.setProperty('align-items', 'center', 'important');
        
        // Thêm class show
        modal.classList.add('show');
        
        // Lắng nghe sự kiện scroll để cập nhật vị trí modal
        window.addEventListener('scroll', updateModalPosition);
        
        console.log('Modal should be visible now');
    }
    
    // Cập nhật vị trí modal theo scroll
    function updateModalPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        modal.style.setProperty('top', scrollTop + 'px', 'important');
        modal.style.setProperty('left', '0', 'important');
    }
    
    // Đóng modal
    function closeModal() {
        modal.classList.remove('show');
        // Xóa event listener scroll
        window.removeEventListener('scroll', updateModalPosition);
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Hiển thị ảnh
    function showImage(index) {
        const img = allImages[index];
        if (img && modalImg) {
            modalImg.src = img.src;
            
            // Điều chỉnh kích thước ảnh phù hợp với màn hình
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Tính toán kích thước tối đa cho ảnh (để lại khoảng trống cho navigation)
            const maxWidth = Math.min(windowWidth * 0.9, 1200); // Tối đa 90% width hoặc 1200px
            const maxHeight = Math.min(windowHeight * 0.8, 800); // Tối đa 80% height hoặc 800px
            
            modalImg.style.setProperty('max-width', maxWidth + 'px', 'important');
            modalImg.style.setProperty('max-height', maxHeight + 'px', 'important');
            modalImg.style.setProperty('width', 'auto', 'important');
            modalImg.style.setProperty('height', 'auto', 'important');
            modalImg.style.setProperty('object-fit', 'contain', 'important');
            modalImg.style.setProperty('border-radius', '8px', 'important');
            modalImg.style.setProperty('box-shadow', '0 0 30px rgba(255, 255, 255, 0.1)', 'important');
        }
        
        // Caption
        const caption = img ? img.closest('.gallery-item').querySelector('h3') : null;
        if (modalCaption) {
            modalCaption.textContent = caption ? caption.textContent : '';
        }
    }
    
    // Event listeners cho gallery items
    const galleryContainers = document.querySelectorAll('.gallery-item .image-arch');
    galleryContainers.forEach((container, index) => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Image clicked! Index:', index);
            openModal(index);
        });
    });
    
    // Event listeners cho modal controls
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Click outside để đóng
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            showImage(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % allImages.length;
            showImage(currentIndex);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                if (prevBtn) {
                    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
                    showImage(currentIndex);
                }
                break;
            case 'ArrowRight':
                if (nextBtn) {
                    currentIndex = (currentIndex + 1) % allImages.length;
                    showImage(currentIndex);
                }
                break;
        }
    });
    
    // Cập nhật kích thước modal khi resize window
    window.addEventListener('resize', function() {
        if (modal.classList.contains('show')) {
            updateModalPosition();
            showImage(currentIndex); // Cập nhật lại kích thước ảnh
        }
    });
});
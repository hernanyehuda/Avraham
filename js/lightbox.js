document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
  
    const galleryImages = document.querySelectorAll('.gallery-grid .gallery-item img');
  
    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
      });
    });
  
    closeBtn.addEventListener('click', function() {
      lightbox.style.display = 'none';
    });
  
    lightbox.addEventListener('click', function(e) {
      if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
      }
    });
  });
  
document.addEventListener('DOMContentLoaded', function () {

  // === SLIDER / CAROUSEL ===
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[index]) {
      slides[index].classList.add('active');
    }
  }

  if (slides.length > 0) {
    showSlide(currentSlide);

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });

      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    const sliderContainer = document.getElementById('slider-container');
    if (sliderContainer) {
      sliderContainer.innerHTML = '';
      slides.forEach(slide => sliderContainer.appendChild(slide));
    }

    let currentSliderIndex = 0;
    function activateSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      if (slides[index]) {
        slides[index].classList.add('active');
      }
    }

    activateSlide(currentSliderIndex);
    setInterval(() => {
      currentSliderIndex = (currentSliderIndex + 1) % slides.length;
      activateSlide(currentSliderIndex);
    }, 5000);
  }

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // === LIGHTBOX ===
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const sliderSources = Array.from(slides)
    .map(slide => slide.querySelector('img'))
    .filter(Boolean)
    .map(img => img.src);

  let currentLightboxIndex = 0;

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    currentLightboxIndex = sliderSources.indexOf(src);
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
  }

  function attachLightbox(img) {
    if (!img) return;
    img.style.cursor = 'pointer';
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      openLightbox(this.src);
    });
  }

  slides.forEach(slide => {
    const img = slide.querySelector('img');
    attachLightbox(img);
  });

  if (lightbox && lightboxImg) {
    lightboxImg.addEventListener('click', function () {
      currentLightboxIndex = (currentLightboxIndex + 1) % sliderSources.length;
      this.src = sliderSources[currentLightboxIndex];
    });

    const closeBtn = document.querySelector('.lightbox .close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  }

  // === CAROUSEL GRID ===
  const carouselGrid = document.getElementById('carousel-grid');
  if (carouselGrid) {
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (!img) return;

      const div = document.createElement('div');
      div.className = 'carousel-item';
      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.alt = img.alt;
      attachLightbox(thumb);
      div.appendChild(thumb);
      carouselGrid.appendChild(div);
    });
  }

  // === ABOUT SLIDESHOW ===
  const aboutSlides = document.querySelectorAll('.about-slide');
  if (aboutSlides.length > 0) {
    let currentAboutIndex = 0;

    function showAboutSlide(index) {
      aboutSlides.forEach(slide => slide.classList.remove('active'));
      if (aboutSlides[index]) {
        aboutSlides[index].classList.add('active');
      }
    }

    showAboutSlide(currentAboutIndex);

    setInterval(() => {
      currentAboutIndex = (currentAboutIndex + 1) % aboutSlides.length;
      showAboutSlide(currentAboutIndex);
    }, 5000);
  }

});
document.addEventListener("DOMContentLoaded", () => {
  const heroImages = document.querySelectorAll(".hero-section img[data-full]");

  heroImages.forEach((img) => {
    const fullSrc = img.getAttribute("data-full");
    const fullImage = new Image();
    fullImage.src = fullSrc;

    fullImage.onload = () => {
      img.src = fullSrc;
    };
  });
});
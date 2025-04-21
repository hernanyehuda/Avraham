document.addEventListener("DOMContentLoaded", function () {
    const galleryName = document.body.dataset.gallery;
  
    if (!galleryName) {
      console.error("Missing gallery name. Add data-gallery='...' to <body>.");
      return;
    }
  
    // Define image counts and file name prefixes
    const galleryImages = {
      concerts: { count: 27, prefix: "concert" },
      lookbooks: { count: 6, prefix: "lookbook" },
      yoga: { count: 8, prefix: "yoga" }
    };
  
    const config = galleryImages[galleryName];
    if (!config) {
      console.error("Unknown gallery:", galleryName);
      return;
    }
  
    const { count, prefix } = config;
    const imagePaths = Array.from({ length: count }, (_, i) => {
      return `images/${galleryName}/${prefix}${i + 1}.jpg`;
    });
  
    const sliderContainer = document.getElementById("slider-container");
    const carouselGrid = document.getElementById("carousel-grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
  
    // Create slides
    imagePaths.forEach((src, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.dataset.index = index;
  
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${prefix} ${index + 1}`;
      img.addEventListener("click", () => openLightbox(src));
  
      const overlay = document.createElement("div");
      overlay.className = "slide-overlay";
  
      slide.appendChild(img);
      slide.appendChild(overlay);
      sliderContainer.appendChild(slide);
    });
  
    // Create thumbnail grid
    imagePaths.forEach((src, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
  
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${prefix} ${index + 1}`;
      img.addEventListener("click", () => openLightbox(src));
  
      item.appendChild(img);
      carouselGrid.appendChild(item);
    });
  
    // Lightbox
    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.style.display = "flex";
    }
  
    document.querySelector(".lightbox .close").addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  
    // Slider Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
  
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      if (slides[index]) slides[index].classList.add("active");
    }
  
    showSlide(currentSlide);
  
    document.querySelector(".prev-btn").addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  
    document.querySelector(".next-btn").addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  });
  
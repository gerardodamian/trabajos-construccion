document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), i * 150);
  });

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `Hola Gerardo, mi nombre es ${name}.

*Servicio solicitado:* ${service}
*Teléfono:* ${phone}

*Descripción:*
${message}`;

    const whatsappURL = `https://wa.me/5493517181975?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    formMessage.textContent = '¡Redirigiendo a WhatsApp!';
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    setTimeout(() => {
      form.reset();
      formMessage.style.display = 'none';
    }, 2000);
  });

  // CONFIGURACIÓN DE IMÁGENES DE LA GALERÍA
  // Agregá o modificá las imágenes aquí
  const galleryData = [
    { url: 'img/cons-2.jpg', title: 'Construcción en seco', description: 'Consultorios en construcción en seco' },
    { url: 'img/agua-1.jpeg', title: 'Sistema de agua caliente', description: 'Instalación de termofusión y sistema de agua caliente' },
    { url: 'img/agua-2.jpeg', title: 'Sistema de agua caliente y fría', description: 'Instalación de termofusión y sistema de agua caliente' },
    { url: 'img/cons-3.jpg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/cons-1.jpg', title: 'Pintura', description: 'Pintura de ambientes con durlock y terminaciones' },
    { url: 'img/dur-1.jpeg', title: 'Durlock', description: 'construccion en seco de isla sobre barra' },
    { url: 'img/dur-2.jpeg', title: 'Durlock', description: 'isla sobre desayunador con luz' },
    { url: 'img/dur-3.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-4.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-5.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-6.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-7.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-8.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-9.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-10.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-11.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-12.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-13.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-14.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/dur-15.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-1.jpeg', title: 'Herreria', description: 'rejas' },
    { url: 'img/herr-2.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-3.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-4.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-5.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-6.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' },
    { url: 'img/herr-7.jpeg', title: 'Construcción en seco', description: 'División de ambientes con durlock y terminaciones' }
    
  ];
  
  let currentLightboxIndex = 0;

  function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Mostrar solo las primeras 3 imágenes
    galleryGrid.innerHTML = galleryData.slice(0, 3).map((item, index) => `
      <div class="gallery-item" data-index="${index}">
        <img src="${item.url}" alt="${item.title}" loading="lazy">
        <div class="gallery-caption">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', function() {
        const index = parseInt(this.closest('.gallery-item').dataset.index);
        openLightbox(index);
      });
    });
  }
  
  // Función para abrir la galería desde el botón
  window.openGalleryLightbox = function(index) {
    openLightbox(index);
  };

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    currentLightboxIndex = index;
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showLightboxImage() {
    const item = galleryData[currentLightboxIndex];
    lightboxImg.src = item.url;
    lightboxCaption.innerHTML = `
      <h3 style="color: #fbbf24; margin-bottom: 8px;">${item.title}</h3>
      <p>${item.description}</p>
      <p style="margin-top: 10px; color: #9ca3af; font-size: 14px;">${currentLightboxIndex + 1} / ${galleryData.length}</p>
    `;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightboxPrev.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
    showLightboxImage();
  });

  lightboxNext.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
    showLightboxImage();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  // Cargar galería al inicio
  renderGallery();
});
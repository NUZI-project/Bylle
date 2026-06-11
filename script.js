// =============================================
//   BYLLE COFFEE — script.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // === HAMBURGER MENU ===
  const hamburger = document.getElementById('hamburger');
  hamburger?.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
  });
  // Close nav when link clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('nav-open'));
  });

  // === MENU TABS ===
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // === GALLERY SCROLL ===
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  galleryNext?.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: 360, behavior: 'smooth' });
  });
  galleryPrev?.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -360, behavior: 'smooth' });
  });

  // Gallery drag-to-scroll
  if (galleryTrack) {
    let isDown = false, startX, scrollLeft;
    galleryTrack.addEventListener('mousedown', e => {
      isDown = true;
      galleryTrack.classList.add('grabbing');
      startX = e.pageX - galleryTrack.offsetLeft;
      scrollLeft = galleryTrack.scrollLeft;
    });
    galleryTrack.addEventListener('mouseleave', () => { isDown = false; galleryTrack.classList.remove('grabbing'); });
    galleryTrack.addEventListener('mouseup', () => { isDown = false; galleryTrack.classList.remove('grabbing'); });
    galleryTrack.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryTrack.offsetLeft;
      galleryTrack.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }

  // === REVIEWS SCROLL ===
  const reviewsTrack = document.getElementById('reviewsTrack');
  document.getElementById('reviewNext')?.addEventListener('click', () => {
    reviewsTrack.scrollBy({ left: 340, behavior: 'smooth' });
  });
  document.getElementById('reviewPrev')?.addEventListener('click', () => {
    reviewsTrack.scrollBy({ left: -340, behavior: 'smooth' });
  });

  // === FADE IN ON SCROLL ===
  const fadeEls = document.querySelectorAll('.fav-card, .review-card, .about-grid, .section-header, .loc-item, .menu-category');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // === SMOOTH ACTIVE NAV HIGHLIGHT ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.opacity = a.getAttribute('href') === '#' + current ? '1' : '';
      a.style.fontWeight = a.getAttribute('href') === '#' + current ? '700' : '';
    });
  };
  window.addEventListener('scroll', highlightNav);

});

// Theme cycle easter egg: default -> dark -> brutalist -> luxe
const themeToggle = document.getElementById('theme-toggle');
const themeModes = ['default', 'dark', 'brutalist', 'luxe'];
const themeClassByMode = {
  dark: 'dark',
  brutalist: 'theme-brutalist',
  luxe: 'theme-luxe'
};

function applyThemeMode(mode) {
  document.body.classList.remove('dark', 'theme-brutalist', 'theme-luxe');
  const cls = themeClassByMode[mode];
  if (cls) document.body.classList.add(cls);
  localStorage.setItem('theme_mode', mode);
  localStorage.setItem('theme', mode === 'dark' ? 'dark' : 'light');
  if (themeToggle) themeToggle.title = `Theme: ${mode} (click to switch)`;
}

let currentThemeMode = localStorage.getItem('theme_mode');
if (!currentThemeMode) {
  // Backward compatibility with legacy dark/light key.
  currentThemeMode = localStorage.getItem('theme') === 'dark' ? 'dark' : 'default';
}
if (!themeModes.includes(currentThemeMode)) currentThemeMode = 'default';
applyThemeMode(currentThemeMode);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const idx = themeModes.indexOf(currentThemeMode);
    currentThemeMode = themeModes[(idx + 1) % themeModes.length];
    applyThemeMode(currentThemeMode);
  });
}

const footerYear = document.getElementById('current-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Visual Art collapsed view (show 1/3 by default, expand on demand)
const artCollapsible = document.getElementById('art-collapsible');
const artGallery = document.getElementById('gallery');
const artShowMore = document.getElementById('art-show-more');

function updateArtCollapsedHeight() {
  if (!artCollapsible || !artGallery) return;
  const fullHeight = artGallery.scrollHeight;
  const collapsedHeight = Math.max(Math.round(fullHeight / 3), 420);
  artCollapsible.style.setProperty('--collapsed-height', `${collapsedHeight}px`);
}

if (artCollapsible && artGallery && artShowMore) {
  updateArtCollapsedHeight();
  window.addEventListener('load', updateArtCollapsedHeight);
  window.addEventListener('resize', updateArtCollapsedHeight);

  artGallery.querySelectorAll('img').forEach((img) => {
    img.addEventListener('load', updateArtCollapsedHeight, { once: true });
  });

  artShowMore.addEventListener('click', () => {
    artCollapsible.classList.remove('is-collapsed');
    artCollapsible.classList.add('is-expanded');
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbLink = document.getElementById('lightbox-link');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lightbox-title');
const lbYear = document.getElementById('lightbox-year');
const lbDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightbox && lbLink && lbImg && lbTitle && lbYear && lbDesc) {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbTitle.textContent = item.dataset.title || '';
      lbYear.textContent = item.dataset.year || '';
      lbDesc.textContent = item.dataset.desc || '';

      const sourceLink = item.dataset.link || '';
      if (sourceLink) {
        lbLink.href = sourceLink;
        lbLink.style.pointerEvents = 'auto';
        lbImg.style.cursor = 'pointer';
        lbImg.title = 'Open original post';
      } else {
        lbLink.removeAttribute('href');
        lbLink.style.pointerEvents = 'none';
        lbImg.style.cursor = 'default';
        lbImg.title = '';
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Scroll reveal animations
const animatedElements = document.querySelectorAll(
  '.gallery-item, .p-card, .project-card, .service-card, .skill-group, .timeline-item, .track, .link-card, .dna-item'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  animatedElements.forEach((el) => {
    el.classList.add('animate-in');
    observer.observe(el);
  });
} else {
  animatedElements.forEach((el) => {
    el.classList.add('animate-in', 'visible');
  });
}

const animationStyle = document.createElement('style');
animationStyle.textContent = `
  .animate-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .animate-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animationStyle);

// CTA click tracking
const ctaButtons = document.querySelectorAll('.track-cta');
ctaButtons.forEach((el) => {
  el.addEventListener('click', () => {
    const ctaName = el.dataset.cta || 'unknown_cta';

    if (window.zaraz && typeof window.zaraz.track === 'function') {
      window.zaraz.track('cta_click', { cta: ctaName });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', { cta_name: ctaName });
    }
  });
});

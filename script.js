// ─── Theme toggle (easter egg — click the name) ─────────────────────
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// ─── Nav scroll effect ───────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── Mobile menu toggle ─────────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// Close menu on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

// ─── Lightbox ────────────────────────────────────────────────────────
// Visual Art collapsed view (show 1/3 by default, expand on demand).
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
const lightbox = document.getElementById('lightbox');
const lbLink = document.getElementById('lightbox-link');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lightbox-title');
const lbYear = document.getElementById('lightbox-year');
const lbDesc = document.getElementById('lightbox-desc');
let activeSourceLink = '';

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = item.dataset.title || '';
    lbYear.textContent = item.dataset.year || '';
    lbDesc.textContent = item.dataset.desc || '';
    activeSourceLink = item.dataset.link || '';

    // Large image click opens original source post when available.
    if (activeSourceLink) {
      lbLink.href = activeSourceLink;
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

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  activeSourceLink = '';
}

// ─── Scroll animations ──────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item, .p-card, .project-card, .service-card, .skill-group, .timeline-item, .track, .link-card, .dna-item').forEach(el => {
  el.classList.add('animate-in');
  observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// CTA click tracking:
// - Sends events to Cloudflare Zaraz when available.
// - Also supports GA4 if gtag is later added.
document.querySelectorAll('.track-cta').forEach((el) => {
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


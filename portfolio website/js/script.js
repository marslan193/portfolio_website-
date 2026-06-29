/* ===========================================================
   MUHAMMAD ARSLAN — PORTFOLIO SCRIPT
=========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. SET FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 4. CURSOR GLOW (follows mouse, desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (glow && !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  /* ---------- 5. HERO TERMINAL TYPING EFFECT ---------- */
  const typedQueryEl = document.getElementById('typedQuery');
  const queryResultEl = document.getElementById('queryResult');
  const cursorBlinkEl = document.getElementById('cursorBlink');

  const queryText = "Muhammad Arslan";

  function typeQuery() {
    if (!typedQueryEl) return;

    if (prefersReducedMotion) {
      typedQueryEl.textContent = queryText;
      if (queryResultEl) queryResultEl.classList.add('visible');
      return;
    }

    let i = 0;
    const speed = 35; // ms per character

    function typeChar() {
      if (i < queryText.length) {
        typedQueryEl.textContent += queryText.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        // Finished typing — reveal result block
        setTimeout(() => {
          if (queryResultEl) queryResultEl.classList.add('visible');
        }, 300);
      }
    }
    typeChar();
  }

  // Start typing shortly after page load for a natural feel
  setTimeout(typeQuery, 400);

  /* ---------- 6. SCROLL-TRIGGERED FADE-UP ANIMATIONS ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // No IntersectionObserver support or reduced motion preferred: show everything immediately
    animatedEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- 7. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = (href === currentId) ? 'var(--accent)' : '';
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

});

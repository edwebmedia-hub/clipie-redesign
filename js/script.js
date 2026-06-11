// ===========================
// CliPie Power Drives — interactions
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initSteps();
  initTestimonials();
  initAccordion();
  initBookingModal();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Booking modal ---------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('.js-open-form');
  const closeTriggers = modal.querySelectorAll('[data-close-modal]');

  function openModal(e) {
    e.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openTriggers.forEach((el) => el.addEventListener('click', openModal));
  closeTriggers.forEach((el) => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const servicesToggle = document.getElementById('servicesToggle');
  const dropdown = servicesToggle.closest('.nav__dropdown');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });

  servicesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-open');
  });

  // close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      dropdown.classList.remove('is-open');
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

/* ---------- How it works progress line ---------- */
function initSteps() {
  const line = document.getElementById('stepsLine');
  if (!line) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        line.classList.add('is-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(line.closest('.steps__track'));
}

/* ---------- Testimonial slider ---------- */
function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.children);
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  slides[0].classList.add('is-active');
  const dots = Array.from(dotsContainer.children);

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  resetTimer();
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__panel').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

// =========================================
//  S. Harini Portfolio — main.js
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ─────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
    else if (page === '' && href === 'index.html') link.classList.add('active');
  });

  /* ── Navbar shadow on scroll ─────────── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ── Scroll-reveal ───────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ── Skill chip ripple ───────────────── */
  document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.96)';
      setTimeout(() => this.style.transform = '', 150);
    });
  });

  /* ── Contact form ────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(135deg,#1a7a3c,#14613a)';
        showToast('Message sent successfully! I\'ll get back to you soon.');
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      }, 1200);
    });
  }

  /* ── Smooth section scroll (home) ───── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Typewriter effect (hero) ────────── */
  const typed = document.getElementById('typedText');
  if (typed) {
    const words = ['MSc Statistics Student', 'AI Enthusiast', 'Web Developer', 'UI/UX Designer'];
    let w = 0, c = 0, deleting = false;
    function type() {
      const word = words[w];
      typed.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);
      if (!deleting && c > word.length) { deleting = true; setTimeout(type, 1400); return; }
      if (deleting && c < 0) { deleting = false; w = (w + 1) % words.length; c = 0; }
      setTimeout(type, deleting ? 60 : 95);
    }
    setTimeout(type, 900);
  }

  /* ── Toast helper ────────────────────── */
  function showToast(msg) {
    let t = document.getElementById('toastMsg');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toastMsg';
      t.className = 'toast-custom';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

  /* ── Animate CGPA counter ────────────── */
  const cgpaEl = document.getElementById('cgpaCounter');
  if (cgpaEl) {
    const target = parseFloat(cgpaEl.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      cgpaEl.textContent = current.toFixed(2);
      if (current >= target) clearInterval(timer);
    }, 25);
  }

});

/* ═══════════════════════════════════════
   BareAesthetic — script.js
   Sakura petals · Clock · Scroll · FAQ
═══════════════════════════════════════ */
 
/* ──────────────────────────────
   1. SAKURA PETALS CANVAS
────────────────────────────── */
(function initPetals() {
  const canvas = document.getElementById('petals');
  const ctx    = canvas.getContext('2d');
  let W, H, petals = [];
 
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
 
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }
 
  /* Draw a small sakura petal shape */
  function drawPetal(ctx, x, y, size, angle, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);
 
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    if (isDark()) {
      gradient.addColorStop(0,   'rgba(255, 182, 193, 0.95)');
      gradient.addColorStop(0.6, 'rgba(255, 126, 179, 0.7)');
      gradient.addColorStop(1,   'rgba(232,  72, 138, 0.0)');
    } else {
      gradient.addColorStop(0,   'rgba(255, 130, 170, 0.95)');
      gradient.addColorStop(0.6, 'rgba(220,  80, 130, 0.7)');
      gradient.addColorStop(1,   'rgba(200,  60, 110, 0.0)');
    }
 
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // heart-like petal shape
    ctx.moveTo(0, -size * 0.6);
    ctx.bezierCurveTo( size * 0.9,  -size * 0.9,  size * 1.2,  size * 0.3,  0,  size);
    ctx.bezierCurveTo(-size * 1.2,  size * 0.3, -size * 0.9,  -size * 0.9,  0, -size * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
 
  function randomPetal() {
    return {
      x:      Math.random() * W,
      y:      -20 - Math.random() * H * 0.3,
      size:   4 + Math.random() * 7,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      angle:  Math.random() * Math.PI * 2,
      spin:   (Math.random() - 0.5) * 0.02,
      sway:   Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      swayAmp:   20 + Math.random() * 30,
      alpha:  0.4 + Math.random() * 0.55,
    };
  }
 
  // spawn initial petals spread across screen
  for (let i = 0; i < 55; i++) {
    const p = randomPetal();
    p.y = Math.random() * H; // pre-distribute
    petals.push(p);
  }
 
  function tick() {
    ctx.clearRect(0, 0, W, H);
 
    // spawn new petal occasionally
    if (petals.length < 60 && Math.random() < 0.03) {
      petals.push(randomPetal());
    }
 
    petals = petals.filter(p => {
      p.y    += p.speedY;
      p.sway += p.swaySpeed;
      p.x    += p.speedX + Math.sin(p.sway) * 0.6;
      p.angle += p.spin;
 
      drawPetal(ctx, p.x, p.y, p.size, p.angle, p.alpha);
 
      return p.y < H + 30 && p.x > -50 && p.x < W + 50;
    });
 
    requestAnimationFrame(tick);
  }
  tick();
})();
 
 
/* ──────────────────────────────
   2. LIVE CLOCK
────────────────────────────── */
(function initClock() {
  const hoursEl   = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  const dateEl    = document.getElementById('clock-date');
 
  const DAYS = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
 
  function pad(n) { return String(n).padStart(2, '0'); }
 
  function updateClock() {
    const now = new Date();
    hoursEl.textContent   = pad(now.getHours());
    minutesEl.textContent = pad(now.getMinutes());
    secondsEl.textContent = pad(now.getSeconds());
    dateEl.textContent    = `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  }
 
  updateClock();
  setInterval(updateClock, 1000);
})();
 
 
/* ──────────────────────────────
   3. THEME TOGGLE
────────────────────────────── */
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const html = document.documentElement;
 
  // persist preference
  const saved = localStorage.getItem('ba-theme');
  if (saved) html.setAttribute('data-theme', saved);
 
  function update() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☾' : '☀';
  }
  update();
 
  btn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('ba-theme', isDark ? 'light' : 'dark');
    update();
  });
})();
 
 
/* ──────────────────────────────
   4. NAVBAR SCROLL EFFECT
────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();
 
 
/* ──────────────────────────────
   5. SCROLL REVEAL (IntersectionObserver)
────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
 
  els.forEach(el => obs.observe(el));
})();
 
 
/* ──────────────────────────────
   6. METRICS BARS ANIMATION
────────────────────────────── */
(function initMetrics() {
  const section  = document.getElementById('metricsSection');
  if (!section) return;
 
  let animated = false;
 
  function animateBars() {
    if (animated) return;
    animated = true;
 
    /* Animate bar fills */
    document.querySelectorAll('.metric-bar-fill').forEach(bar => {
      const value = parseInt(bar.dataset.value, 10);
      // small delay so observer fires first, then smooth fill
      setTimeout(() => {
        bar.style.width = value + '%';
      }, 100);
    });
 
    /* Animate score counters */
    document.querySelectorAll('.animated-score').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500; // ms
      const start = performance.now();
 
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * target);
        el.textContent = current + '/100';
        if (progress < 1) requestAnimationFrame(step);
      }
 
      setTimeout(() => requestAnimationFrame(step), 100);
    });
  }
 
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateBars();
    });
  }, { threshold: 0.25 });
 
  obs.observe(section);
})();
 
 
/* ──────────────────────────────
   7. FAQ ACCORDION
────────────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
 
      // close siblings in same container
      const siblings = item.parentElement.querySelectorAll('.faq-item');
      siblings.forEach(s => s.classList.remove('open'));
 
      if (!isOpen) item.classList.add('open');
    });
  });
})();
 
 
/* ──────────────────────────────
   8. SMOOTH ANCHOR SCROLL
────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // nav height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
 
 
/* ──────────────────────────────
   9. PARALLAX ON HERO BLOBS
────────────────────────────── */
(function initParallax() {
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    blobs.forEach((blob, i) => {
      const speed = 0.08 + i * 0.04;
      blob.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();
 
 
/* ──────────────────────────────
   10. ESP CARD HOVER GLOW CURSOR
────────────────────────────── */
(function initESPCards() {
  document.querySelectorAll('.esp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * 8;
      const rotY   = ((x - cx) / cx) * -8;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

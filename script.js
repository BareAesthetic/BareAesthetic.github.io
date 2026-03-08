document.addEventListener('DOMContentLoaded', () => {
  const themes = ['theme-light', 'theme-dark', 'theme-aero'];
  let currentTheme = 1;

  // Вкладки
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(tab.getAttribute('href')).classList.add('active');
    });
  });

  // Переключение тем
  const toggle = document.getElementById('theme-switch');
  toggle.addEventListener('change', () => {
    document.body.classList.remove(...themes);
    currentTheme = (currentTheme + 1) % 3;
    document.body.classList.add(themes[currentTheme]);

    const label = toggle.nextElementSibling;
    label.querySelector('.sun').style.opacity = currentTheme === 0 ? 1 : 0;
    label.querySelector('.moon').style.opacity = currentTheme === 1 ? 1 : 0;
    label.querySelector('.aero').style.opacity = currentTheme === 2 ? 1 : 0;
  });

  // Космос — звёзды + кометы
  const canvas = document.getElementById('cosmic-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.6 + 0.4,
      speed: Math.random() * 0.0008 + 0.0003
    });
  }

  const comets = [];
  function spawnComet() {
    comets.push({
      x: Math.random() * w,
      y: -100,
      len: Math.random() * 120 + 80,
      speed: Math.random() * 12 + 8,
      alpha: 1
    });
  }

  setInterval(spawnComet, 3000);

  function draw() {
    ctx.fillStyle = 'rgba(0,0,20,0.06)';
    ctx.fillRect(0, 0, w, h);

    // Звёзды
    stars.forEach(s => {
      s.alpha = 0.4 + Math.sin(Date.now() * s.speed) * 0.6;
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Кометы
    comets.forEach((c, i) => {
      c.y += c.speed;
      c.alpha -= 0.008;

      if (c.alpha <= 0 || c.y > h + 100) {
        comets.splice(i, 1);
        return;
      }

      const g = ctx.createLinearGradient(c.x, c.y, c.x - 30, c.y + c.len);
      g.addColorStop(0, `rgba(220,240,255,${c.alpha})`);
      g.addColorStop(1, 'transparent');

      ctx.strokeStyle = g;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x - 30, c.y + c.len);
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  draw();
});

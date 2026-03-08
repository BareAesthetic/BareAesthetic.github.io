document.addEventListener('DOMContentLoaded', () => {
  const themes = ['theme-light', 'theme-dark', 'theme-aero'];
  let currentThemeIndex = 1; // тёмная по умолчанию

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

  // Переключение тем (цикл из 3)
  const toggle = document.getElementById('theme-switch');
  toggle.addEventListener('change', () => {
    document.body.classList.remove(...themes);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.classList.add(themes[currentThemeIndex]);

    // Иконки
    const label = toggle.nextElementSibling;
    label.querySelector('.sun').style.opacity = currentThemeIndex === 0 ? 1 : 0;
    label.querySelector('.moon').style.opacity = currentThemeIndex === 1 ? 1 : 0;
    label.querySelector('.aero').style.opacity = currentThemeIndex === 2 ? 1 : 0;
  });

  // Звёзды и кометы на canvas
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const stars = [];
  const comets = [];

  // Звёзды
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * 0.02 + 0.01
    });
  }

  // Кометы
  function createComet() {
    comets.push({
      x: Math.random() * w,
      y: -50,
      speed: Math.random() * 8 + 6,
      length: Math.random() * 80 + 60,
      alpha: 1
    });
  }

  setInterval(createComet, 4000); // комета каждые 4 секунды

  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, w, h);

    // Звёзды
    stars.forEach(s => {
      s.alpha += Math.sin(Date.now() * s.twinkle) * 0.01;
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Кометы
    comets.forEach((c, i) => {
      c.y += c.speed;
      c.alpha -= 0.008;

      if (c.alpha <= 0) {
        comets.splice(i, 1);
        return;
      }

      const gradient = ctx.createLinearGradient(c.x, c.y, c.x - 20, c.y + c.length);
      gradient.addColorStop(0, `rgba(255,240,200,${c.alpha})`);
      gradient.addColorStop(1, 'transparent');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x - 20, c.y + c.length);
      ctx.stroke();
    });

    requestAnimationFrame(animate);
  }

  animate();
});

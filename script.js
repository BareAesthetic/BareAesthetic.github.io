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

  // Темы
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

  // Фейерверки
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const fireworks = [];

  function createFirework() {
    const x = Math.random() * w;
    fireworks.push({
      x, y: -50,
      vy: Math.random() * 8 + 10,
      color: `hsl(${Math.random()*360}, 100%, 60%)`,
      exploded: false,
      particles: []
    });
  }

  setInterval(createFirework, 1800);

  function animate() {
    ctx.fillStyle = 'rgba(0,0,20,0.05)';
    ctx.fillRect(0, 0, w, h);

    fireworks.forEach((fw, i) => {
      if (!fw.exploded) {
        fw.y += fw.vy;
        if (fw.y > h * 0.4) {
          fw.exploded = true;
          for (let j = 0; j < 60; j++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            fw.particles.push({
              x: fw.x, y: fw.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 3,
              life: 80 + Math.random()*40,
              color: fw.color
            });
          }
        }

        ctx.fillStyle = fw.color;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 5, 0, Math.PI*2);
        ctx.fill();
      } else {
        fw.particles.forEach((p, j) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.life--;

          ctx.globalAlpha = p.life / 120;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
          ctx.fill();

          if (p.life <= 0) fw.particles.splice(j, 1);
        });

        if (fw.particles.length === 0) fireworks.splice(i, 1);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});

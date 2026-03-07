// Переключение вкладок
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    tab.classList.add('active');
    document.querySelector(tab.getAttribute('href')).classList.add('active');
  });
});

// Переключение тем
document.querySelectorAll('.theme-picker button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.className = ''; // сбрасываем все классы
    document.body.classList.add(`theme-${btn.dataset.theme}`);
    
    document.querySelectorAll('.theme-picker button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Превью аватарки
document.getElementById('avatar')?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.querySelector('.avatar-preview img').src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// ────────────────────────────────────────────────
//      Фон: частицы, ракета, пузыри, искры
// ────────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
const rocket = { x: w/2, y: h*0.8, vy: -8, trail: [] };
let sparkTimer = 0;

class Particle {
  constructor(x, y, vx, vy, life, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.color = color;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.08; // гравитация
    this.life--;
  }
  draw() {
    const a = this.life / this.maxLife;
    ctx.globalAlpha = a * 0.7;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2 + a*3, 0, Math.PI*2);
    ctx.fill();
  }
}

function createSparks(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    particles.push(new Particle(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed - 3,
      60 + Math.random()*40,
      `hsl(${Math.random()*60 + 10}, 100%, 60%)`
    ));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0,0,w,h);

  // Ракета
  rocket.y += rocket.vy;
  rocket.trail.push({x: rocket.x, y: rocket.y});
  if (rocket.trail.length > 40) rocket.trail.shift();

  // След ракеты
  ctx.globalAlpha = 0.8;
  for (let i = 0; i < rocket.trail.length; i++) {
    const p = rocket.trail[i];
    const a = i / rocket.trail.length;
    ctx.fillStyle = `rgba(255,180,60,${a*0.9})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6 * a + 2, 0, Math.PI*2);
    ctx.fill();
  }

  // Искры от ракеты
  sparkTimer++;
  if (sparkTimer > 6) {
    createSparks(rocket.x, rocket.y, 4);
    sparkTimer = 0;
  }

  // Пузыри
  if (Math.random() < 0.04) {
    const x = Math.random() * w;
    particles.push(new Particle(x, h + 20, (Math.random()-0.5)*0.8, -1 - Math.random()*2, 300, 'rgba(200,240,255,0.4)'));
  }

  // Обновление и отрисовка частиц
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  }

  // Ракета возвращается наверх
  if (rocket.y < -100) {
    rocket.y = h + 100;
    rocket.x = Math.random() * w * 0.6 + w*0.2;
    rocket.trail = [];
  }

  requestAnimationFrame(animate);
}

animate();

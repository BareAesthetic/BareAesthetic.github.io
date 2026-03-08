// Переключение вкладок с анимацией
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    tab.classList.add('active');
    const target = document.querySelector(tab.getAttribute('href'));
    target.classList.add('active');
  });
});

// Анимация расширения модулей
function toggleModule(card) {
  card.classList.toggle('expanded');
  if (card.classList.contains('expanded')) {
    card.innerHTML += '<p class="extra">Изменение: FPS +20%, визуалы мягче. Анимация перехода...</p>';
  } else {
    card.querySelector('.extra')?.remove();
  }
}

// Фон частицы (листья/искры)
const particlesDiv = document.querySelector('.background-particles');
for (let i = 0; i < 20; i++) {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = '10px';
  particle.style.height = '10px';
  particle.style.background = 'radial-gradient(circle, rgba(255,150,50,0.8), transparent)';
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animation = `float ${5 + Math.random()*10}s linear infinite`;
  particlesDiv.appendChild(particle);
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
  100% { transform: translateY(0) scale(1); opacity: 0.5; }
}
.expanded {
  transform: scale(1.1);
  transition: transform 0.4s ease;
}
.extra {
  margin-top: 16px;
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

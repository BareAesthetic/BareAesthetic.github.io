document.addEventListener('DOMContentLoaded', () => {
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

  // Переключатель темы
  const toggle = document.getElementById('theme-switch');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
  });

  // Демо формы (можно убрать или заменить на реальный auth позже)
  document.querySelector('.profile-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Вход (демо)');
  });
});

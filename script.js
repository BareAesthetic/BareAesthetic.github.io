document.addEventListener('DOMContentLoaded', () => {
  // Переключение вкладок
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(tab.getAttribute('href')).classList.add('active');
    });
  });

  // Демо регистрации
  document.querySelector('.reg-btn').addEventListener('click', () => {
    alert('Регистрация откроется скоро!');
  });
});

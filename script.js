document.addEventListener('DOMContentLoaded', () => {
  const themes = ['theme-light', 'theme-dark', 'theme-aero'];
  let currentThemeIndex = 1; // начинаем с тёмной

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

  // Цикл тем по клику на переключатель
  const toggle = document.getElementById('theme-switch');
  toggle.addEventListener('change', () => {
    document.body.classList.remove(...themes);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.classList.add(themes[currentThemeIndex]);

    // Меняем иконки в зависимости от темы
    const label = toggle.nextElementSibling;
    label.querySelector('.sun').style.opacity = currentThemeIndex === 0 ? 1 : 0;
    label.querySelector('.moon').style.opacity = currentThemeIndex === 1 ? 1 : 0;
    label.querySelector('.aero').style.opacity = currentThemeIndex === 2 ? 1 : 0;
  });
});

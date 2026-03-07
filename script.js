document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute('href'));

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      target.classList.add('active');
    });
  });

  // Toggle темный режим
  document.getElementById('theme-toggle').addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Демо формы
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Вход (демо)');
  });

  document.getElementById('register').addEventListener('click', () => {
    alert('Регистрация (демо)');
  });

  document.getElementById('google-login').addEventListener('click', () => {
    alert('Вход через Gmail (демо)');
  });

  // Preview аватарки
  const avatarInput = document.getElementById('avatar-input');
  const avatarPreview = document.getElementById('avatar-preview');
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        avatarPreview.src = e.target.result;
        avatarPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
});

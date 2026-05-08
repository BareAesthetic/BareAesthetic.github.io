/* ============================================================
   script.js — BareAesthetic сайт
   Содержит:
   1. Переключатель тёмной/светлой темы (плавно, с анимацией)
   2. Модальное окно входа
   3. FAQ аккордеон
   4. Анимация появления карточек при скролле
   5. Сакурные лепестки (частицы)
   6. Навбар: скролл-эффект + мобильный бургер
   7. Форма уведомления в магазине
   ============================================================ */
 
/* ===================== 1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ =====================
   При клике меняем data-theme на <html> теге.
   CSS переменные автоматически пересчитываются.
*/
 
// Получаем сохранённую тему из localStorage (чтобы помнить выбор пользователя)
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);
 
// Кнопка переключения темы
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
 
themeToggle.addEventListener('click', () => {
  // Определяем текущую тему и переключаем на противоположную
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
 
  // Применяем анимацию «вспышки» при переключении
  document.body.style.transition = 'background 0.5s, color 0.5s';
 
  // Меняем тему на html теге — CSS переменные обновятся автоматически
  document.documentElement.setAttribute('data-theme', next);
 
  // Сохраняем выбор в localStorage
  localStorage.setItem('theme', next);
 
  // Обновляем иконку кнопки
  updateThemeIcon(next);
 
  // Небольшая анимация самой кнопки
  themeToggle.style.transform = 'rotate(180deg) scale(1.15)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 350);
});
 
// Функция обновления иконки в зависимости от темы
function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}
 
 
/* ===================== 2. МОДАЛЬНОЕ ОКНО ВХОДА ===================== */
 
const loginBtn     = document.getElementById('loginBtn');
const modalOverlay = document.getElementById('modalOverlay');
 
// Открываем модалку при клике на «Личный кабинет»
loginBtn.addEventListener('click', () => {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
});
 
// Закрываем модалку при клике на фон (оверлей)
function closeModal(event) {
  // Закрываем только если клик именно по оверлею, а не по самой модалке
  if (event.target === modalOverlay) {
    closeLoginModal();
  }
}
 
// Закрыть модалку (вызывается из кнопки ✕ и при клике на фон)
function closeLoginModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = ''; // Возвращаем прокрутку
}
 
// Закрытие модалки по клавише Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeLoginModal();
  }
});
 
// Обработка кнопки «Войти»
function handleLogin() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
 
  if (!username || !password) {
    // Подсвечиваем пустые поля розовым
    if (!username) shakeInput('loginUsername');
    if (!password) shakeInput('loginPassword');
    return;
  }
 
  // Здесь в будущем будет запрос к API.
  // Пока показываем сообщение (замени на настоящую авторизацию).
  alert('Вход: функция будет доступна после запуска магазина 🌸');
}
 
// Анимация «тряски» для пустых полей
function shakeInput(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#ff6b9d';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.animation = '';
    el.style.borderColor = '';
  }, 400);
}
 
// Анимация тряски в CSS (добавляем через JS)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
 
 
/* ===================== 3. FAQ АККОРДЕОН =====================
   toggleFaq вызывается из onclick атрибута в HTML.
*/
function toggleFaq(btn) {
  // Находим родительский .faq-item
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
 
  // Закрываем все открытые FAQ
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
 
  // Если кликнутый был закрыт — открываем его
  if (!isOpen) {
    item.classList.add('open');
  }
}
 
 
/* ===================== 4. АНИМАЦИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ =====================
   Используем Intersection Observer API для отслеживания
   видимости элементов и добавления класса .visible
*/
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Небольшая задержка для каждой карточки — эффект стаггера
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target); // Анимируем только один раз
      }
    });
  },
  {
    threshold: 0.1,     // Срабатываем когда 10% элемента видно
    rootMargin: '0px 0px -40px 0px'
  }
);
 
// Добавляем класс fade-up всем карточкам, секциям, FAQ
document.querySelectorAll(
  '.feature-card, .faq-item, .section-title, .section-label, .section-sub, .shop-unavailable'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
 
 
/* ===================== 5. САКУРНЫЕ ЛЕПЕСТКИ (ЧАСТИЦЫ) =====================
   Создаём div-элементы с классом .sakura-petal,
   которые падают сверху вниз с анимацией из CSS.
*/
function createPetals() {
  const container = document.getElementById('particles');
  const petalCount = 15; // Количество лепестков
 
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
 
    // Случайные параметры для каждого лепестка
    const left     = Math.random() * 100;     // Позиция по горизонтали (%)
    const size     = Math.random() * 8 + 6;   // Размер 6–14px
    const duration = Math.random() * 8 + 6;   // Скорость падения 6–14с
    const delay    = Math.random() * 10;       // Задержка старта 0–10с
 
    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
 
    container.appendChild(petal);
  }
}
 
// Запускаем лепестки
createPetals();
 
 
/* ===================== 6. НАВБАР: ТЕНЬ ПРИ СКРОЛЛЕ + МОБИЛЬНЫЙ БУРГЕР ===================== */
 
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
 
// Добавляем тень навбару при скролле вниз
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(255, 107, 157, 0.15)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
 
// Мобильный бургер: открываем/закрываем меню
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Анимация бургера → крестик
  burger.classList.toggle('active');
});
 
// Закрываем мобильное меню при клике на пункт
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});
 
 
/* ===================== 7. ФОРМА УВЕДОМЛЕНИЙ В МАГАЗИНЕ ===================== */
 
function handleNotify() {
  const emailInput = document.getElementById('notifyEmail');
  const successMsg = document.getElementById('notifySuccess');
  const email = emailInput.value.trim();
 
  // Простая валидация email
  if (!email || !email.includes('@') || !email.includes('.')) {
    shakeInput('notifyEmail');
    emailInput.style.borderColor = '#ff6b9d';
    setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
    return;
  }
 
  // Успех: показываем сообщение
  // В реальном сайте здесь будет fetch() запрос к бэкенду или сервису типа Mailchimp
  emailInput.style.display = 'none';
  successMsg.classList.add('show');
 
  // Кнопку тоже скрываем
  emailInput.nextElementSibling.style.display = 'none';
}
 
 
/* ===================== ДОПОЛНИТЕЛЬНО: плавный акцент при наведении на навигацию =====================
   Подсвечиваем активный пункт меню в зависимости от позиции скролла
*/
const sections = document.querySelectorAll('section[id]');
 
window.addEventListener('scroll', () => {
  let current = '';
 
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
 
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--sakura)';
    }
  });
}, { passive: true });

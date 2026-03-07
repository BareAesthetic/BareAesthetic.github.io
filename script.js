// Firebase config (вставь свой из Firebase консоли)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Tabs switching
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

  // Toggle dark mode
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Auth
  const loginForm = document.getElementById('login-form');
  const registerBtn = document.getElementById('register');
  const googleBtn = document.getElementById('google-login');
  const authMessage = document.getElementById('auth-message');

  registerBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        userCredential.user.sendEmailVerification();
        authMessage.textContent = 'Регистрация OK! Проверь почту для кода верификации.';
      })
      .catch(error => {
        authMessage.textContent = 'Ошибка: ' + error.message;
      });
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential.user.emailVerified) {
          authMessage.textContent = 'Вход OK!';
        } else {
          authMessage.textContent = 'Подтверди email!';
        }
      })
      .catch(error => {
        authMessage.textContent = 'Ошибка: ' + error.message;
      });
  });

  googleBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        authMessage.textContent = 'Вход через Gmail OK!';
      })
      .catch(error => {
        authMessage.textContent = 'Ошибка: ' + error.message;
      });
  });

  // Avatar preview
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

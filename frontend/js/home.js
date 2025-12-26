
// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Prevent jump for placeholder nav links
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
  });
});

const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const openLoginBtn = document.getElementById('open-login');
const openSignupBtn = document.getElementById('open-signup');
const switchToSignupBtn = document.getElementById('switch-to-signup');
const switchToLoginBtn = document.getElementById('switch-to-login');

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('auth-modal--open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('auth-modal--open');
  modal.setAttribute('aria-hidden', 'true');
}

if (openLoginBtn && loginModal) {
  openLoginBtn.addEventListener('click', () => {
    openModal(loginModal);
  });
}

if (openSignupBtn && signupModal) {
  openSignupBtn.addEventListener('click', () => {
    openModal(signupModal);
  });
}

document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', () => {
    closeModal(loginModal);
    closeModal(signupModal);
  });
});

if (switchToSignupBtn) {
  switchToSignupBtn.addEventListener('click', () => {
    closeModal(loginModal);
    openModal(signupModal);
  });
}

if (switchToLoginBtn) {
  switchToLoginBtn.addEventListener('click', () => {
    closeModal(signupModal);
    openModal(loginModal);
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal(loginModal);
    closeModal(signupModal);
  }
});


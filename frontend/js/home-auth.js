// frontend/js/home-auth.js
// Reuse the simple local login/signup behaviour from the standalone pages
// for the modals on the home page.

;(function () {
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  function handleHomeLogin(event) {
    event.preventDefault();

    const emailEl = document.getElementById('login-email');
    const passwordEl = document.getElementById('login-password');

    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value.trim() : '';

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    localStorage.setItem('eazycv_logged_in', 'true');
    localStorage.setItem('eazycv_user_email', email);

    window.location.href = 'form.html';
  }

  function handleHomeSignup(event) {
    event.preventDefault();

    const emailEl = document.getElementById('signup-email');
    const passwordEl = document.getElementById('signup-password');
    const confirmEl = document.getElementById('signup-confirm');

    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value.trim() : '';
    const confirm = confirmEl ? confirmEl.value.trim() : '';

    if (!email || !password || !confirm) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    localStorage.setItem('eazycv_logged_in', 'true');
    localStorage.setItem('eazycv_user_email', email);

    window.location.href = 'form.html';
  }

  window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-modal .auth-modal__form');
    if (loginForm) {
      loginForm.addEventListener('submit', handleHomeLogin);
    }

    const signupForm = document.querySelector('#signup-modal .auth-modal__form');
    if (signupForm) {
      signupForm.addEventListener('submit', handleHomeSignup);
    }
  });
})();

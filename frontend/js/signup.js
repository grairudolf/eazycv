// frontend/js/signup.js
// Simple client-side only sign-up for local demo use.

;(function () {
  const signupForm = document.getElementById('signup-form');
  const message = document.getElementById('message');

  if (!signupForm) return;

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) {
      message.style.color = 'red';
      message.textContent = '';
    }

    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const confirmPasswordEl = document.getElementById('confirm-password');

    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value.trim() : '';
    const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value.trim() : '';

    if (!email || !password) {
      if (message) message.textContent = 'Please enter email and password.';
      return;
    }

    if (password !== confirmPassword) {
      if (message) message.textContent = 'Passwords do not match.';
      return;
    }

    // For local demo we simply treat this as a successful sign up.
    localStorage.setItem('eazycv_logged_in', 'true');
    localStorage.setItem('eazycv_user_email', email);

    if (message) {
      message.style.color = 'green';
      message.textContent = 'Sign up successful! Redirecting to CV form...';
    }

    setTimeout(() => {
      window.location.href = 'form.html';
    }, 1500);
  });
})();

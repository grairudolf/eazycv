// frontend/js/login.js
// Simple client-side only login for local demo use.

;(function () {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  if (!loginForm) return;

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (errorMessage) errorMessage.textContent = '';

    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');

    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value.trim() : '';

    if (!email || !password) {
      if (errorMessage) errorMessage.textContent = 'Please enter email and password.';
      return;
    }

    if (!isValidEmail(email)) {
      if (errorMessage) errorMessage.textContent = 'Please enter a valid email address (e.g. name@example.com).';
      return;
    }

    if (!isValidPassword(password)) {
      if (errorMessage) errorMessage.textContent = 'Password must be at least 6 characters long.';
      return;
    }

// Use the mock Supabase client to sign in
(async () => {
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    if (errorMessage) errorMessage.textContent = error.message;
  } else {
    // On successful login, redirect to the form page
    window.location.href = 'form.html';
  }
})();
  });
})();

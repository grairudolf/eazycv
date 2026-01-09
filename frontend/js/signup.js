// frontend/js/signup.js
// Simple client-side only sign-up for local demo use.

;(function () {
  const signupForm = document.getElementById('signup-form');
  const message = document.getElementById('message');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

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

    if (!email || !password || !confirmPassword) {
      if (message) message.textContent = 'Please fill in all fields.';
      return;
    }

    if (!isValidEmail(email)) {
      if (message) message.textContent = 'Please enter a valid email address (e.g. name@example.com).';
      return;
    }

    if (!isValidPassword(password)) {
      if (message) message.textContent = 'Password must be at least 6 characters long.';
      return;
    }

    if (password !== confirmPassword) {
      if (message) message.textContent = 'Passwords do not match.';
      return;
    }

    // Use the mock Supabase client to sign up
    (async () => {
      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        if (message) message.textContent = error.message;
      } else {
        if (message) {
          message.style.color = 'green';
          message.textContent = 'Sign up successful! Redirecting to CV form...';
        }
        setTimeout(() => {
          window.location.href = 'form.html';
        }, 1500);
      }
    })();
  });
})();

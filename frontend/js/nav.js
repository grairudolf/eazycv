(function(){
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');

  if (!nav || !toggle || !menu) return;

  function closeMenu(){
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded','false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav--open')) return;
    if (!nav.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // ---- Auth state handling ----
  function setupAuthNav(){
    const actions = nav.querySelector('.nav__actions');
    if (!actions) return;

    const isLoggedIn = localStorage.getItem('eazycv_logged_in') === 'true';
    const email = localStorage.getItem('eazycv_user_email') || '';

    if (!isLoggedIn){
      // Logged out: keep default Log In / Sign Up links.
      return;
    }

    // Clear existing auth links.
    actions.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'nav__profile-wrap';

    const avatar = document.createElement('div');
    avatar.className = 'nav__profile';
    const initial = (email || 'U').charAt(0).toUpperCase();
    avatar.textContent = initial;

    const emailSpan = document.createElement('span');
    emailSpan.className = 'nav__profile-email';
    emailSpan.textContent = email || 'Profile';

    wrap.appendChild(avatar);
    wrap.appendChild(emailSpan);

    const logoutBtn = document.createElement('button');
    logoutBtn.type = 'button';
    logoutBtn.className = 'nav__auth nav__auth--ghost nav__logout';
    logoutBtn.textContent = 'Log out';
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('eazycv_logged_in');
      localStorage.removeItem('eazycv_user_email');
      localStorage.removeItem('eazycv_current_cv_id');
      window.location.href = 'index.html';
    });

    actions.appendChild(wrap);
    actions.appendChild(logoutBtn);
  }

  window.addEventListener('DOMContentLoaded', setupAuthNav);
})();

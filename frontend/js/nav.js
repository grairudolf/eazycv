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
})();

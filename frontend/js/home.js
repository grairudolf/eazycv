
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


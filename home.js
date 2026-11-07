const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  document.body.classList.toggle('menu-open', !open);
  toggle.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu';
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.querySelector('.sr-only').textContent = 'Open menu';
  }
});

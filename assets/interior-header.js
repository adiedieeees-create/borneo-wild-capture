(() => {
  const headers = document.querySelectorAll('.bwc-header');
  headers.forEach((header) => {
    const toggle = header.querySelector('.bwc-menu-toggle');
    const menu = header.querySelector('.bwc-menu');
    if (!toggle || !menu) return;
    const close = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) close();
    });
  });
})();

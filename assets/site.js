(() => {
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  toggles.forEach((toggle) => {
    const menuId = toggle.getAttribute('aria-controls');
    const menu = menuId ? document.getElementById(menuId) : null;
    if (!menu) return;

    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };
    const openMenu = () => {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    };

    toggle.addEventListener('click', () => {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  });

  document.querySelectorAll('.hotel-art img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => {
      const holder = img.closest('.hotel-art');
      if (!holder) return;
      holder.classList.add('is-fallback');
      img.remove();
      const label = document.createElement('span');
      label.className = 'hotel-fallback';
      label.textContent = img.getAttribute('data-fallback') || 'PANGKALAN BUN HOTEL';
      holder.appendChild(label);
    }, { once: true });
  });

  // Turn the wildlife gallery into an accessible, keyboard-friendly lightbox.
  const galleryImages = document.querySelectorAll('.gallery img');
  if (galleryImages.length && typeof HTMLDialogElement !== 'undefined') {
    galleryImages.forEach((img) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `gallery-open${img.classList.contains('wide') ? ' wide' : ''}`;
      button.setAttribute('aria-label', `View photo: ${img.alt || 'Wildlife photograph'}`);
      img.classList.remove('wide');
      img.parentNode.insertBefore(button, img);
      button.appendChild(img);
    });

    const dialog = document.createElement('dialog');
    dialog.className = 'photo-lightbox';
    dialog.setAttribute('aria-label', 'Wildlife photo viewer');
    const top = document.createElement('div');
    top.className = 'lightbox-top';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lightbox-close';
    close.setAttribute('aria-label', 'Close photo viewer');
    close.textContent = '×';
    top.appendChild(close);
    const imageWrap = document.createElement('div');
    imageWrap.className = 'lightbox-image-wrap';
    const largeImage = document.createElement('img');
    largeImage.className = 'lightbox-image';
    imageWrap.appendChild(largeImage);
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    dialog.append(top, imageWrap, caption);
    document.body.appendChild(dialog);

    let previousFocus = null;
    const closeDialog = () => {
      if (dialog.open) dialog.close();
    };
    document.querySelectorAll('.gallery-open').forEach((button) => {
      button.addEventListener('click', () => {
        const source = button.querySelector('img');
        if (!source) return;
        previousFocus = button;
        largeImage.src = source.currentSrc || source.src;
        largeImage.alt = source.alt || 'Wildlife photograph';
        caption.textContent = source.alt || 'Borneo Wild Capture wildlife photograph';
        dialog.showModal();
        close.focus();
      });
    });
    close.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener('close', () => {
      largeImage.removeAttribute('src');
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    });
  }

})();

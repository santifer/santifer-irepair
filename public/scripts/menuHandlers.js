export function toggleMenuMovil() {
  const menu = document.getElementById('mobile-menu');
  const main = document.getElementById('main');
  const hamburger = document.getElementById('hamburger');
  const closeHamburger = document.getElementById('close-hamburger');

  // Toggle the menu visibility based on the 'hidden' class presence
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.style.opacity = '1';
      menu.classList.add('flex');
      main.classList.add('opacity-75');
      main.classList.add('blur-sm');
    }, 10);

    hamburger.classList.add('hidden');
    closeHamburger.classList.remove('hidden');

    // Attach an event listener to close the menu when clicking outside
    main.addEventListener(
      'click',
      (event) => {
        // Check if the click was outside the menu
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
          toggleMenuMovil(); // Recursively call the function to close the menu
        }
      },
      { once: true }
    ); // Use the 'once' option so the event is automatically removed after it fires
  } else {
    menu.style.opacity = '0';
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    main.classList.remove('opacity-75');
    main.classList.remove('blur-sm');

    hamburger.classList.remove('hidden');
    closeHamburger.classList.add('hidden');
  }
}

export function toggleMenu(menuId, toggleSubMenuIconId) {
  const menu = document.getElementById(menuId);
  const toggleIconSubMenu = document.getElementById(toggleSubMenuIconId);

  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    toggleIconSubMenu.classList.add('rotate-180');
  } else {
    menu.classList.remove('flex');
    menu.classList.add('hidden');
    toggleIconSubMenu.classList.remove('rotate-180');
  }
}

export function toggleSubMenu(subMenuId, toggleIconId) {
  const submenu = document.getElementById(subMenuId);
  const toggleIcon = document.getElementById(toggleIconId);

  if (submenu.classList.contains('hidden')) {
    submenu.classList.remove('hidden');
    submenu.classList.add('flex');
    toggleIcon.classList.add('rotate-180');
  } else {
    submenu.classList.remove('flex');
    submenu.classList.add('hidden');
    toggleIcon.classList.remove('rotate-180');
  }
}

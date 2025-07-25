const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-white', 'shadow-md', "dark:bg-[#020817]");
  } else {
    navbar.classList.add('bg-transparent');
    navbar.classList.remove('bg-white', 'shadow-md', "dark:bg-[#020817]");
  }
});

const botonHamburguesa = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('.menu-link');
let open = false;

botonHamburguesa.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  animacionIcono();
});

links.forEach(link => {
  link.addEventListener('click', () => {
    // Oculta el menú al hacer clic en un enlace (solo si está visible)
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
    }
    animacionIcono();
  });
});

function animacionIcono() {
  let menu1  = `<svg xmlns="http://www.w3.org/2000/svg" class="text-[#020817] dark:text-[#F8FAFC] transition-all duration-200" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
  let menu2 = `<svg xmlns="http://www.w3.org/2000/svg" class="text-[#020817] dark:text-[#F8FAFC] transition-all duration-200"   width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

  open = !open;

  // animación rápida de escala antes del cambio
  botonHamburguesa.classList.remove('scale-100');
  botonHamburguesa.classList.add('scale-75');

  setTimeout(() => {
    botonHamburguesa.innerHTML = open ? menu2 : menu1; // ✖ o ≡
    botonHamburguesa.classList.remove('scale-75');
    botonHamburguesa.classList.add('scale-100');
  }, 150); // espera antes de cambiar y escalar de vuelta
};

const btn = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

const MODES = ['auto', 'light', 'dark'];
const SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor text-foreground"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun text-foreground"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon text-foreground"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>']
let current = 0;

function applyTheme(mode, svg) {
  if (mode === 'light') {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else if (mode === 'dark') {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // Auto: usar preferencia del sistema
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', prefersDark);
  }
  
  btn.forEach((boton) => {
  boton.innerHTML = `
    ${svg}
    <span class="text-[12px]">${mode.charAt(0).toUpperCase() + mode.slice(1)}</span>`;
});
}

// Cambiar al hacer clic
btn.forEach((boton) => {
  boton.addEventListener('click', () => {
    current = (current + 1) % MODES.length;
    applyTheme(MODES[current], SVG[current]);
  });
});

// Al cargar, aplicar desde localStorage o sistema
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    current = 1;
  } else if (saved === 'dark') {
    current = 2;
  } else {
    current = 0;
  }
  applyTheme(MODES[current], SVG[current]);
});

// Escuchar cambios de preferencia del sistema si está en modo auto
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    html.classList.toggle('dark', e.matches);
  }
});
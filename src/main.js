import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'  


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Animaciones de entrada variadas por sección, en vez de un único fade genérico

// About: fade + stats-grid con stagger (cada stat aparece uno tras otro)
gsap.from('#about h2, #about > p', {
  opacity: 0,
  y: 30,
  duration: 0.7,
  scrollTrigger: { trigger: '#about', start: 'top 70%' },
})

gsap.from('.stat', {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.08,
  scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
})

// Services: título fade, cada .service entra desde un lado alterno
gsap.from('#services h2, .services-inner > p', {
  opacity: 0,
  y: 30,
  duration: 0.7,
  scrollTrigger: { trigger: '#services', start: 'top 70%' },
})

document.querySelectorAll('.service').forEach((service, i) => {
  const fromLeft = i % 2 === 0
  gsap.from(service, {
    opacity: 0,
    x: fromLeft ? -60 : 60,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: service, start: 'top 75%' },
  })
})

// Partners: título desde la izquierda, tarjetas con stagger
gsap.from('.partners-left', {
  opacity: 0,
  x: -50,
  duration: 0.8,
  scrollTrigger: { trigger: '#partners', start: 'top 60%' },
})

gsap.from('.partner-card', {
  opacity: 0,
  scale: 0.85,
  duration: 0.5,
  stagger: 0.06,
  scrollTrigger: { trigger: '.partners-right', start: 'top 70%' },
})

// Testimonial: escala + fade, más elegante para una cita
gsap.from('#testimonial h2, #testimonial > p', {
  opacity: 0,
  y: 20,
  duration: 0.7,
  scrollTrigger: { trigger: '#testimonial', start: 'top 70%' },
})

gsap.from('blockquote', {
  opacity: 0,
  scale: 0.95,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: { trigger: 'blockquote', start: 'top 75%' },
})

// Join: título y texto entran desde direcciones opuestas
gsap.from('.join-title-block', {
  opacity: 0,
  x: -50,
  duration: 0.8,
  scrollTrigger: { trigger: '#join', start: 'top 70%' },
})

gsap.from('.join-text-block', {
  opacity: 0,
  x: 50,
  duration: 0.8,
  scrollTrigger: { trigger: '#join', start: 'top 70%' },
})

// Contact: fade + scale suave para el bloque completo
gsap.from('.contact-content', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: { trigger: '#contact', start: 'top 70%' },
})

// Footer: fade simple, discreto
gsap.from('footer', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  scrollTrigger: { trigger: 'footer', start: 'top 90%' },
})

const cursor = document.querySelector('.custom-cursor')

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
})

const anchorLinks = document.querySelectorAll('a[href^="#"]')

anchorLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href')
    const targetEl = document.querySelector(targetId)

    if (!targetEl) return

    e.preventDefault()

    gsap.to(window, {
      duration: 1.8,
      scrollTo: {
        y: targetEl,
        offsetY: 88, // compensa la altura del header fijo
      },
      ease: 'power3.inOut',
    })
  })
})
// Escala dinámicamente el contenido interno de las ilustraciones de Services
// (tokens y exchanges) para que mantengan sus proporciones exactas de Figma
// sin importar el ancho real del contenedor en pantallas responsive.

function scaleServiceIllustrations() {
  const wrappers = document.querySelectorAll('.service-image-wrapper');

  wrappers.forEach((wrapper) => {
    const inner = wrapper.querySelector('.service-image-inner');
    if (!inner) return;

    // Ancho de referencia original: 422px para tokens, 432px para exchanges
    const baseWidth = wrapper.classList.contains('exchanges-wrapper') ? 432 : 422;
    const baseHeight = wrapper.classList.contains('exchanges-wrapper') ? 387 : 366;

    const actualWidth = wrapper.offsetWidth;
    const scale = actualWidth / baseWidth;

    inner.style.transform = `scale(${scale})`;

    // Ajusta la altura real del wrapper para que el layout de flujo
    // (flex/gap con el texto) calcule el espacio correctamente
    wrapper.style.height = `${baseHeight * scale}px`;
  });
}

// Ejecutar al cargar y en cada resize (con debounce simple para performance)
let resizeTimeout;
function debouncedScale() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(scaleServiceIllustrations, 100);
}

window.addEventListener('load', scaleServiceIllustrations);
window.addEventListener('resize', debouncedScale);

// ── MICRO-INTERACCIONES DE HOVER ──

// Botones primarios: leve elevación al pasar el mouse
document.querySelectorAll('.btn-primary').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { y: -3, duration: 0.3, ease: 'power2.out' })
  })
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { y: 0, duration: 0.3, ease: 'power2.out' })
  })
})

// Tarjetas de exchanges (Partners): leve escala + brillo del borde
document.querySelectorAll('.partner-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.05,
      borderColor: 'rgba(102, 93, 205, 0.8)',
      duration: 0.3,
      ease: 'power2.out',
    })
  })
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      borderColor: 'rgba(65, 85, 114, 0.5)',
      duration: 0.3,
      ease: 'power2.out',
    })
  })
})

// Stats de About: leve elevación al pasar el mouse
document.querySelectorAll('.stat').forEach((stat) => {
  stat.addEventListener('mouseenter', () => {
    gsap.to(stat, { y: -5, duration: 0.3, ease: 'power2.out' })
  })
  stat.addEventListener('mouseleave', () => {
    gsap.to(stat, { y: 0, duration: 0.3, ease: 'power2.out' })
  })
})

// Links con flecha (Learn more): la flecha se desliza un poco al hover
document.querySelectorAll('.link-arrow').forEach((link) => {
  const arrow = link.querySelector('.arrow-icon')
  if (!arrow) return

  link.addEventListener('mouseenter', () => {
    gsap.to(arrow, { x: 5, duration: 0.3, ease: 'power2.out' })
  })
  link.addEventListener('mouseleave', () => {
    gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' })
  })
})

// Botones circulares de Testimonial: leve escala
document.querySelectorAll('.testimonial-arrow').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.1, duration: 0.25, ease: 'power2.out' })
  })
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' })
  })
})

const interactiveSelectors = 'a, button, .partner-card, .stat, .btn-primary, .btn-nav'

document.querySelectorAll(interactiveSelectors).forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover')
  })
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover')
  })
})

// Parallax sutil en los blobs decorativos
const parallaxBlobs = [
  { selector: '.services-blob-wrapper', speed: 80 },
  { selector: '.partners-blob-wrapper', speed: 60 },
  { selector: '.join-blob-blue', speed: 50 },
  { selector: '.join-blob-gold', speed: -40 },
  { selector: '.contact-blob-1', speed: 60 },
  { selector: '.contact-blob-3', speed: -50 },
]

parallaxBlobs.forEach(({ selector, speed }) => {
  const el = document.querySelector(selector)
  if (!el) return

  gsap.to(el, {
    y: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })
})
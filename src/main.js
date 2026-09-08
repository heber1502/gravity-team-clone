import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealElements = document.querySelectorAll('.reveal')

revealElements.forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    scrollTrigger: {
      trigger: element,
      start: 'top 70%',
    }
  })
})

const cursor = document.querySelector('.custom-cursor')

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
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
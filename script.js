// Factores de gravedad relativos a la Tierra (aproximados)
const factores = {
  "Mercury": 0.38,
  "Earth": 1.0,
  "Jupiter": 2.34,
  "Moon": 0.165,
  "Sun": 27.9
};

// Datos adicionales por planeta (en inglés según tu tabla)
const infoPlanetas = {
  "Mercury": {
    gravity: "3.7 m/s²",
    surface: "Rocky, cratered surface",
    temp: "From -180°C to 430°C",
    day: "59 Earth days",
    year: "88 Earth days",
    facts: "1. Closest planet to the Sun. 2. No significant atmosphere. 3. A year lasts shorter than its day."
  },
  "Earth": {
    gravity: "9.8 m/s²",
    surface: "71% water, 29% land",
    temp: "15°C",
    day: "24 hours",
    year: "365 days",
    facts: "1. Only planet known to have life. 2. Atmosphere blocks harmful rays. 3. The Moon stabilizes its rotation."
  },
  "Jupiter": {
    gravity: "24.8 m/s²",
    surface: "Gaseous, made of hydrogen and helium",
    temp: "110°C",
    day: "10 hours",
    year: "11.9 Earth years",
    facts: "1. Largest planet in the Solar System. 2. Home to the Great Red Spot storm. 3. Has over 90 moons."
  },
  "Moon": {
    gravity: "1.6 m/s²",
    surface: "Rocky and dusty, cratered",
    temp: "From -173°C to 127°C",
    day: "27.3 Earth days",
    year: "Not applicable (orbits Earth)",
    facts: "1. No atmosphere or sound. 2. Only body visited by humans. 3. Causes ocean tides on Earth."
  },
  "Sun": {
    gravity: "274 m/s²",
    surface: "Gaseous (hydrogen and helium)",
    temp: "5,500°C on surface / 15 million °C in core",
    day: "25 days (equator)",
    year: "Not applicable",
    facts: "1. Contains 99.8% of the Solar System’s mass. 2. Generates energy through fusion. 3. Sunlight takes 8 min 20 s to reach Earth."
  }
};

// Imágenes en formato .gif
const imagenes = {
  "Mercury": "imagenes/mercury.gif",
  "Earth": "imagenes/earth.gif",
  "Jupiter": "imagenes/jupiter.gif",
  "Moon": "imagenes/moon.gif",
  "Sun": "imagenes/sun.gif"
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formDatos');
  const nombreInput = document.getElementById('nombreInput');
  const edadInput = document.getElementById('edadInput');
  const pesoInput = document.getElementById('pesoInput');
  const modal = document.getElementById('modal');
  const cerrarModal = document.getElementById('cerrarModal');
  const carousel = document.querySelector('.carousel');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');
  let slideIndex = 0;
  let slides = [];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const edad = parseFloat(edadInput.value);
    const peso = parseFloat(pesoInput.value);

    if (!nombre || isNaN(edad) || edad <= 0 || edad > 120 || isNaN(peso) || peso <= 0) {
      alert("Por favor ingresa todos los datos correctamente.");
      return;
    }

    generarSlides(nombre, edad, peso);
    slideIndex = 0;
    mostrarSlide(slideIndex);
    modal.style.display = 'block';
  });

  cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  prevSlide.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    mostrarSlide(slideIndex);
  });

  nextSlide.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    mostrarSlide(slideIndex);
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  function generarSlides(nombre, edad, peso) {
    carousel.innerHTML = '';
    slides = [];

    for (const cuerpo in factores) {
      const factor = factores[cuerpo];
      const pesoRelativo = (peso * factor).toFixed(2);
      const info = infoPlanetas[cuerpo];
      const yearValue = info.year.includes("Not") ? null : info.year.split(" ")[0];
      const edadRelativa = yearValue ? (edad * 365 / (parseFloat(yearValue) || 365)).toFixed(2) : "-";

      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.innerHTML = `
        <h2>${cuerpo}</h2>
        <img src="${imagenes[cuerpo]}" alt="${cuerpo}" />
        <div class="info">
          🌍 <strong>Gravity:</strong> ${info.gravity}<br>
          🪐 <strong>Surface:</strong> ${info.surface}<br>
          🌡️ <strong>Average Temperature:</strong> ${info.temp}<br>
          ⏰ <strong>Length of Day:</strong> ${info.day}<br>
          📅 <strong>Length of Year:</strong> ${info.year}<br><br>
          💫 <strong>Fun Facts:</strong><br>${info.facts}
        </div>
        <div class="peso-cuerpo">
          ${nombre}, on ${cuerpo} you would weigh <strong>${pesoRelativo} kg</strong><br>
          and you would be <strong>${edadRelativa}</strong> years old.
        </div>
      `;
      carousel.appendChild(slide);
      slides.push(slide);
    }
  }

  function mostrarSlide(n) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
  }

  // Efecto estela
  document.body.addEventListener('mousemove', e => {
    const target = e.target;
    if (target.closest('.formulario') || target.closest('.modal')) return;
    crearEstela(e.clientX, e.clientY);
  });

  function crearEstela(x, y) {
    const st = document.createElement('div');
    st.classList.add('stela');
    document.body.appendChild(st);
    st.style.left = `${x - 20}px`;
    st.style.top = `${y - 20}px`;

    const colores = ['#ffcc00', '#ff66cc', '#66ccff', '#ccff66', '#ff9966', '#cc99ff'];
    st.style.filter = `drop-shadow(0 0 6px ${colores[Math.floor(Math.random() * colores.length)]})`;

    setTimeout(() => st.remove(), 800);
  }
});

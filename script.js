// CONFIGURACIÓN GLOBAL
let currentImages = [];
let currentIndex = 0;
const numeroWhatsApp = "50251749515";

// Función global de redirección de compras
function comprar(producto) {
  const mensaje = `Hola, quiero el ${producto}`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// ==========================================
// FUNCIÓN PARA CAMBIAR IMÁGENES POR TEMA
// ==========================================
function actualizarImagenesPorTema(tema) {
  // Buscar todas las imágenes con atributos data-src-dark y data-src-light
  document.querySelectorAll('[data-src-dark][data-src-light]').forEach(img => {
    if (tema === 'dark') {
      img.src = img.getAttribute('data-src-dark');
    } else {
      img.src = img.getAttribute('data-src-light');
    }
  });

  // Cambiar el fondo del hero según el tema
  const hero = document.querySelector('.hero');
  if (hero) {
    if (tema === 'dark') {
      hero.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("Portada/Fondo3.jpg")';
    } else {
      hero.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("Portada/Fondo2.jpg")';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. SISTEMA MODO CLARO / OSCURO
  // ==========================================
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  actualizarImagenesPorTema(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      actualizarImagenesPorTema(newTheme);
    });
  }

  // ==========================================
  // 2. DETECTOR DE SECCIÓN DESTACADA (ZAPATOS)
  // ==========================================
  document.querySelectorAll('.btn-zapato').forEach(btn => {
    btn.addEventListener('click', function() {
      const nombreZapato = this.getAttribute('data-zapato');
      comprar(nombreZapato);
    });
  });

  // ==========================================
  // 3. SELECCIÓN DINÁMICA DE TARJETAS
  // ==========================================
  document.querySelectorAll('.card').forEach(card => {
    // Agregar listener a la tarjeta completa
    card.addEventListener('click', function(e) {
      // Prevenir que ciertos elementos no abran el modal
      if (e.target.tagName === 'A') return;
      
      const nombre = this.dataset.nombre;
      const precio = this.dataset.precio;
      
      let imagenes = [];
      try {
        imagenes = JSON.parse(this.dataset.imagenes);
      } catch (error) {
        console.error("Error al procesar imágenes JSON del producto:", nombre, error);
        return;
      }

      abrirModal(nombre, precio, imagenes);
    });
    
    // Agregar cursor: pointer visual al pasar el mouse
    card.style.cursor = 'pointer';
  });

  // ==========================================
  // 4. CONTROLADORES DEL MODAL (CERRAR)
  // ==========================================
  const modal = document.getElementById("modal");
  const btnCerrar = document.querySelector(".cerrar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (modal && btnCerrar) {
    btnCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar si hace clic fuera del recuadro blanco/negro
    modal.addEventListener('click', function(event) {
      if (event.target === this) cerrarModal();
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === "block") {
        cerrarModal();
      }
    });
  }

  // Navegación interna del modal
  if (prevBtn) prevBtn.onclick = prevImage;
  if (nextBtn) nextBtn.onclick = nextImage;
});

// ==========================================
// 5. FUNCIONES OPERATIVAS DEL MODAL
// ==========================================
function abrirModal(nombre, precio, imagenes) {
  currentImages = imagenes;
  currentIndex = 0;

  document.getElementById("modal").style.display = "block";
  document.getElementById("nombreProducto").innerText = nombre;
  document.getElementById("precioProducto").innerText = precio;

  actualizarContenidoModal();

  // Generar barra de miniaturas
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  imagenes.forEach((img, index) => {
    const imagenMini = document.createElement("img");
    imagenMini.src = img;
    imagenMini.alt = `Miniatura ${index + 1}`;
    if (index === 0) imagenMini.classList.add("active");

    imagenMini.onclick = function (e) {
      e.stopPropagation();
      currentIndex = index;
      actualizarContenidoModal();
    };

    galeria.appendChild(imagenMini);
  });

  // Enlace definitivo al botón de compra
  document.getElementById("btnComprar").onclick = function () {
    comprar(nombre);
  };
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function prevImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  actualizarContenidoModal();
}

function nextImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentImages.length;
  actualizarContenidoModal();
}

function actualizarContenidoModal() {
  const imgActiva = currentImages[currentIndex] || '';
  document.getElementById("imgPrincipal").src = imgActiva;

  // Actualizar estado visual de las miniaturas en la galería
  const miniaturas = document.querySelectorAll("#galeria img");
  miniaturas.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

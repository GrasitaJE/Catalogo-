function comprar(producto) {
  let numero = "50251749515"; // TU NUMERO AQUI
  let mensaje = `Hola, quiero el ${producto}`;
  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");

}
let currentImages = [];
let currentIndex = 0;

function abrirModal(nombre, precio, imagenes) {
  currentImages = imagenes;
  currentIndex = 0;

  document.getElementById("modal").style.display = "block";

  document.getElementById("nombreProducto").innerText = nombre;
  document.getElementById("precioProducto").innerText = precio;

  // Imagen principal
  document.getElementById("imgPrincipal").src = imagenes[0];

  // Galería
  let galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  imagenes.forEach((img, index) => {
    let imagen = document.createElement("img");
    imagen.src = img;

    imagen.onclick = function () {
      currentIndex = index;
      document.getElementById("imgPrincipal").src = img;
    };

    galeria.appendChild(imagen);
  });

  // Botón comprar
  document.getElementById("btnComprar").onclick = function () {
    comprar(nombre);
  };

  // Navegación
  document.getElementById("prevBtn").onclick = prevImage;
  document.getElementById("nextBtn").onclick = nextImage;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById("imgPrincipal").src = currentImages[currentIndex];
}

function nextImage() {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    document.getElementById("imgPrincipal").src = currentImages[currentIndex];
  } else {
    document.getElementById("galeria").scrollIntoView({behavior: 'smooth'});
  }
}

function comprar(producto) {
  let numero = "50251749515"; // PON TU NÚMERO
  let mensaje = `Hola, quiero el ${producto}`;
  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

// Hacer las tarjetas clickeables y eventos del modal
document.addEventListener('DOMContentLoaded', function() {
  // Hacer tarjetas clickeables
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
      // No ejecutar si se clickea en el botón directamente
      if (e.target.tagName === 'BUTTON') return;
      
      const button = this.querySelector('button');
      if (button && button.onclick) {
        const onclickStr = button.getAttribute('onclick');
        const match = onclickStr.match(/abrirModal\((.+)\)/);
        if (match) {
          const argsStr = match[1];
          eval('abrirModal(' + argsStr + ')');
        }
      }
    });
  });

  // Cerrar modal al hacer click en el fondo
  const modal = document.getElementById("modal");
  modal.addEventListener('click', function(event) {
    if (event.target === this) {
      cerrarModal();
    }
  });

  // Permitir cerrar con tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      cerrarModal();
    }
  });
});

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
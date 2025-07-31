// libreria para la galeria 
new VenoBox({
    selector: '.my-image-links',
    numeration: true,
    infinigall: true,
    share: true,
    spinner: 'rotating-plane'
});

//popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// para el texto al lado de la imagen ESTO PUEDE QUE SE VAYA
// Seleccionar la imagen y el texto
const image = document.getElementById("clickableImage");
const text = document.getElementById("text");

// Agregar un evento de clic a la imagen
image.addEventListener("click", () => {
  // Alternar la visibilidad del texto
  if (text.style.display === "none" || text.style.display === "") {
    text.style.display = "block"; // Mostrar el texto
  } else {
    text.style.display = "none"; // Ocultar el texto
  }
});


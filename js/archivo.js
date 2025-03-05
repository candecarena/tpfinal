const fullImgBox = document.getElementById("fullImgBox"),
//ahora accedo a la img
fullImg = document.getElementById("fullImg");

function openFullImg(reference){
    fullImgBox.style.display = "flex";
    fullImg.src = reference
}
function closeImg(){
    fullImgBox.style.display = "none";
}
//popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// para el texto al lado de la imagen
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


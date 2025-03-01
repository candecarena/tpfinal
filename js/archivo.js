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
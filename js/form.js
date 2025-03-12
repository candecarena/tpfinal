const submitBtn = document.getElementById('submitBtn');
const validate = (e) => {
  e.preventDefault();
  const nombre = document.getElementById('inputNombre');
  const direccionEmail = document.getElementById('inputEmail');
  const contraseña = document.getElementById('inputContraseña');
  if (nombre.value === "") {
    alert("Por favor completa tu nombre");
    nombre.focus();
    return false;
  }

  if (direccionEmail.value === "") {
    alert("Por favor completa la direccion de Email");
    direccionEmail.focus();
    return false;
  }

  if (!emailIsValid(direccionEmail.value)) {
    alert("Por favor completa con una direccion de Email verdadera");
    direccionEmail.focus();
    return false;
  }

  if (contraseña.value === "") {
    alert("Por favor completa con tu localidad");
    contraseña.focus();
    return false;
  }

  return true; // Can submit the form data to the server
}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

submitBtn.addEventListener('click', validate);


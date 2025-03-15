const submitBtn = document.getElementById('submitBtn');
  const formulario = document.getElementById('miFormulario');

  const validate = (e) => {
    e.preventDefault(); // evita que se envíe el formulario hasta que pase la validación

    const nombre = document.getElementById('inputNombre');
    const direccionEmail = document.getElementById('inputEmail');
    const contraseña = document.getElementById('inputContraseña');

    if (nombre.value.trim() === "") {
      alert("Por favor completa tu nombre");
      nombre.focus();
      return false;
    }

    if (direccionEmail.value.trim() === "") {
      alert("Por favor completa la dirección de Email");
      direccionEmail.focus();
      return false;
    }

    if (!emailIsValid(direccionEmail.value.trim())) {
      alert("Por favor completa con una dirección de Email válida");
      direccionEmail.focus();
      return false;
    }

    if (contraseña.value.trim() === "") {
      alert("Por favor completa tu contraseña");
      contraseña.focus();
      return false;
    }

    formulario.submit(); // envía el formulario si todo está correcto
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  submitBtn.addEventListener('click', validate);
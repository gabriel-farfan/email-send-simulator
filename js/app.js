document.addEventListener("DOMContentLoaded", function () {

  const email = {
    email: "",
    asunto: "",
    mensaje: ""
  }



  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputcc = document.querySelector("#cc");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#submit");
  const btnReset = document.querySelector("#reset");
  const spinner = document.querySelector("#spinner");

  inputEmail.addEventListener("blur", validar);

  inputAsunto.addEventListener("blur", validar);

  inputMensaje.addEventListener("blur", validar);

  inputcc.addEventListener("blur", validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetFormulario()
  })

// ------ Funciones -------
  function enviarEmail(e) {
    e.preventDefault()

    spinner.classList.add('flex')
    spinner.classList.remove('hidden');
    setTimeout(() => {
      spinner.classList.add('hidden');
      spinner.classList.remove('flex');
      
      resetFormulario()
      
      // Alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("bg-green-600", "text-white", "p-2", "text-center", "rounded-lg", "nt-10", "font-bold", "text-sm", "uppercase");
      
      alertaExito.textContent = "El email se enviÓ correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);

    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      comprobarEmail()
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El Email no es valido", e.target.parentElement);
      comprobarEmail()
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Guardar el valor del input en el objeto
    email[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail()



  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    referencia.appendChild(error);
  }


  function limpiarAlerta(referencia) {
    // Comprobar que no existe una alerta previa
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    const resultado = regex.test(email);
    console.log(resultado);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      
    } else {
      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
    }
  }

  function resetFormulario() {
    // Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    email.cc = "";

    formulario.reset();
    comprobarEmail()
  }

});

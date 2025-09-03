document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");
  const nombreInput = document.getElementById("nombre");
  const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = nombreInput.value.trim();

    if (nombre.length > 0) {
      // Muestra mensaje de bienvenida
      mensajeBienvenida.innerHTML = `<h2>¡Bienvenido, ${nombre}!</h2>`;
      
      // Oculta el formulario después de registrarse
      form.style.display = "none";
    } else {
      alert("Por favor ingresa tu nombre antes de continuar.");
    }
  });
});


// Agregar codigo para buscar el producto




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



//Script para añadir productos al carro de compra

document.addEventListener('DOMContentLoaded', () => {
    // Referencias comunes a ambos archivos
    const contadorCarritoHeader = document.querySelector('.cart');

    // Función para actualizar el contador del carrito en el encabezado
    const actualizarContador = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contadorCarritoHeader.textContent = `Carrito 🛒 (${totalItems})`;
    };

    // Actualizar el contador al cargar cualquier página
    actualizarContador();

    // Lógica para la página de productos
    // Verificamos si estamos en la URL de productos.html
    if (window.location.pathname.includes('productos.html')) {
        const botonesAgregar = document.querySelectorAll('.btn-agregar');
        
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const tarjeta = event.target.closest('.card');
                if (!tarjeta) return; // Salir si no se encuentra la tarjeta

                const id = tarjeta.dataset.id;
                const nombre = tarjeta.querySelector('.nombre-producto').textContent;
                // Ajuste para manejar diferentes separadores de miles y decimales
                const precioTexto = tarjeta.querySelector('.precio-producto').textContent.replace('$', '').replace(/\./g, '').replace(',', '.').trim();
                const precio = parseFloat(precioTexto);

                const imagen = tarjeta.querySelector('img').src; // Obtener la URL de la imagen

                const nuevoProducto = {
                    id,
                    nombre,
                    precio,
                    cantidad: 1,
                    imagen: imagen
                };

                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const productoExistente = carrito.find(item => item.id === id);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push(nuevoProducto);
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContador();
                console.log(`Producto "${nombre}" agregado al carrito.`);
            });
        });
    }

    // Lógica para la página del carrito
    if (window.location.pathname.includes('carrito.html')) {
        const listaCarrito = document.getElementById('lista-carrito');
        const mensajeVacio = document.getElementById('mensaje-vacio');
        const totalCarrito = document.getElementById('total-carrito');
        const totalSpan = document.getElementById('total');

        const renderizarCarrito = () => {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            listaCarrito.innerHTML = ''; // Limpiamos la lista para volver a renderizar

            if (carrito.length === 0) {
                mensajeVacio.style.display = 'block';
                listaCarrito.style.display = 'none';
                totalCarrito.style.display = 'none';
            } else {
                mensajeVacio.style.display = 'none';
                listaCarrito.style.display = 'grid'; // Usa 'grid' para que se vea bien si usas la misma clase de CSS
                totalCarrito.style.display = 'block';
                let totalGeneral = 0;

                carrito.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('item-carrito');
                    
                    const precioFormateado = producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
                    const subtotal = producto.precio * producto.cantidad;
                    const subtotalFormateado = subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });

                    productoDiv.innerHTML = `
                    <div class="info-producto-carrito">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto-carrito">
                        <div class="detalles-producto-carrito">
                            <span class="nombre-carrito">${producto.nombre}</span>
                            <span class="precio-unidad-carrito">${precioFormateado}</span>
                            <div class="cantidad-control">
                                <button class="btn-cantidad" data-id="${producto.id}" data-accion="restar">-</button>
                                <span class="cantidad-carrito">${producto.cantidad}</span>
                                <button class="btn-cantidad" data-id="${producto.id}" data-accion="sumar">+</button>
                            </div>
                            <span class="subtotal-carrito">Subtotal: ${subtotalFormateado}</span>
                        </div>
                        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                    </div>
                `;
                    listaCarrito.appendChild(productoDiv);
                    totalGeneral += subtotal;
                });

                totalSpan.textContent = totalGeneral.toLocaleString('es-CL', { minimumFractionDigits: 0 });
            }
        };

        listaCarrito.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-eliminar')) {
                const idProducto = event.target.dataset.id;
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                
                // Eliminamos el producto del carrito
                carrito = carrito.filter(producto => producto.id !== idProducto);
                
                localStorage.setItem('carrito', JSON.stringify(carrito));
                
                renderizarCarrito();
                actualizarContador();
            }
        });

        // Llamamos a las funciones para que se ejecuten al cargar la página
        renderizarCarrito();
    }
});



// Script para ingresar a una cuenta de usuario o administrador

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const loginEmailInput = document.getElementById('login-email');

    // Escucha el evento de envío del formulario
    formLogin.addEventListener('submit', (e) => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();

        // Obtiene el valor del correo electrónico
        const email = loginEmailInput.value;

        // --- INICIO DE LA LÓGICA DE SIMULACIÓN ---

        // Revisa si el correo termina con "@duocuc.cl"
        if (email.endsWith('@duocuc.cl')) {
            // Si es un correo de Duoc, redirige a la página de administrador
            window.location.href = 'modo_administrador.html';
        } else {
            // Si no es de Duoc, redirige a una página de usuario normal (ej. la página principal)
            window.location.href = 'index.html'; 
        }

        // --- FIN DE LA LÓGICA DE SIMULACIÓN ---
    });
});


// Script para crear cuenta

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-registro');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const password2Input = document.getElementById('password2');
    const tycCheckbox = document.getElementById('tyc');

    form.addEventListener('submit', function(event) {
        // Previene el envío del formulario.
        event.preventDefault();

        // Elimina los mensajes de error previos.
        clearErrors();

        let isValid = true;

        // Validación del nombre
        if (nombreInput.value.trim() === '') {
            showError('err-nombre', 'Por favor, introduce tu nombre completo.');
            isValid = false;
        }

        // Validación del correo electrónico
        if (emailInput.value.trim() === '') {
            showError('err-email', 'El correo electrónico es un campo obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError('err-email', 'Por favor, introduce un correo electrónico válido.');
            isValid = false;
        }

        // Validación de la contraseña
        if (passwordInput.value.trim() === '') {
            showError('err-password', 'La contraseña es un campo obligatorio.');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError('err-password', 'La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }

        // Validación de la confirmación de contraseña
        if (password2Input.value.trim() === '') {
            showError('err-password2', 'Por favor, repite la contraseña.');
            isValid = false;
        } else if (password2Input.value !== passwordInput.value) {
            showError('err-password2', 'Las contraseñas no coinciden.');
            isValid = false;
        }

        // Validación de los términos y condiciones
        if (!tycCheckbox.checked) {
            showError('err-tyc', 'Debes aceptar los Términos y Condiciones.');
            isValid = false;
        }

        // Si todos los campos son válidos, se podría enviar el formulario.
        if (isValid) {
            alert('¡Formulario enviado correctamente!');
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(el => el.textContent = '');
    }

    function isValidEmail(email) {
        // validar un email básico
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
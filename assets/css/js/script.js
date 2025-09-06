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
    // Verificamos si estamos en la URL de carrito.html
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
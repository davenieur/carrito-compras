let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// Total del carrito

const total = document.querySelector("#total");


const numeroProductos = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);

numerito.innerText = numeroProductos

let productos = [];

fetch("./productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        return response.json();
    })
    .then(data => {
        productos = data;
        cargarProductosCarrito(productos);
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

 
    if (productosEnCarrito.length > 0) {
        console.log("Entra");
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.images}" alt="${producto.description}">
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${producto.name}</h3>
                    </div>

                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>${producto.price}</p>
                    </div>

                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>

                    <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>

                
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

//cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


function actualizarNumerito() {
    const numeroProductos = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);

    numerito.innerText = numeroProductos

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;

    const productoEliminado = productos.find(producto => producto.id == idBoton);


    Swal.fire({
        icon: 'question',
        html: `¿Eliminar ${productoEliminado.name} del carrito?`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        
    }).then((result) => {
        if (result.isConfirmed) {
    
            const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        
            
            if(index !== -1) {
                const indexEnCarrito = productosEnCarrito.findIndex(producto => producto.id == idBoton);
                productosEnCarrito.splice(indexEnCarrito, 1);
                console.log("Carrito", productosEnCarrito)
            } 
        
        
            actualizarNumerito();
        
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        
           
           cargarProductosCarrito();
        
        }
    })

    actualizarNumerito()

}

function vaciarCarrito() {
    
    Swal.fire({
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })

    actualizarNumerito()
}

botonVaciar.addEventListener("click", vaciarCarrito);

function actualizarTotal() {

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => 
        acc + (parseFloat(producto.price.replace('$', '').replace(',', '').replace('MXN', '')) * parseInt(producto.cantidad)), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}





// ***********************Formulario********************************
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-compradores');
    const correo = document.getElementById('correo');
    const direccion = document.getElementById('direccion');
    const noExterior = document.getElementById('noExterior');
    const codigoPostal = document.getElementById('codigoPostal');
    const telefono = document.getElementById('telefono');
    const estado = document.getElementById('estado');
    
    const correoError = document.getElementById('correoError');
    const direccionError = document.getElementById('direccionError');
    const noExteriorError = document.getElementById('noExteriorError');
    const codigoPostalError = document.getElementById('codigoPostalError');
    const telefonoError = document.getElementById('telefonoError');
    const estadoError = document.getElementById('estadoError');

    form.addEventListener('submit', function (event) {
        let valid = true;
        
        // Validación de correo electrónico
        if (!correo.checkValidity()) {
            valid = false;
            correoError.textContent = 'Por favor, ingrese un correo electrónico válido.';
        } else {
            correoError.textContent = '';
        }

        // Validación de dirección
        if (direccion.value.trim() === '') {
            valid = false;
            direccionError.textContent = 'Por favor, ingrese su dirección.';
        } else {
            direccionError.textContent = '';
        }

        // Validación de noExterior
        if (noExterior.value.trim() === '') {
            valid = false;
            noExteriorError.textContent = 'Por favor, ingrese el número exterior.';
        } else {
            noExteriorError.textContent = '';
        }

        // Validación de código postal
        if (codigoPostal.value.length < 5 || codigoPostal.value.length > 7) {
            valid = false;
            codigoPostalError.textContent = 'El código postal debe tener mínimo 5 caracteres.';
        } else {
            codigoPostalError.textContent = '';
        }

        // Validación de estado
        if (estado.value === '') {
            valid = false;
            estadoError.textContent = 'Por favor, seleccione un estado.';
        } else {
            estadoError.textContent = '';
        }

        // Validación de teléfono
        if (telefono.value.length !== 10) {
            valid = false;
            telefonoError.textContent = 'El número de teléfono debe tener exactamente 10 dígitos.';
        } else {
            telefonoError.textContent = '';
        }

        if (!valid) {
            event.preventDefault();
        }
    });
});

// ´++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




// document.addEventListener('DOMContentLoaded', () => {
//     const carrito = document.getElementById('carrito');
//     const listaCarrito = document.getElementById('lista-carrito');
//     const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//     const total = document.getElementById('total');

//     // Función para cargar el catálogo de productos
//     function cargarCatalogo() {
//         // Aquí deberías cargar el catálogo de productos desde tu JSON
//         const catalogoProductos = [
//             // Aquí van los productos
//         ];

//         mostrarCatalogo(catalogoProductos);
//     }

//     // Función para mostrar el catálogo de productos
//     function mostrarCatalogo(catalogoProductos) {
//         const catalogo = document.getElementById('catalogo');
//         catalogo.innerHTML = '';

//         catalogoProductos.forEach(producto => {
//             const divProducto = document.createElement('div');
//             divProducto.innerHTML = `
//                 <div>
//                     <h3>${producto.name}</h3>
//                     <p>Precio: $${producto.price} MXN</p>
//                     <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
//                 </div>
//             `;
//             catalogo.appendChild(divProducto);
//         });
//     }

//     // Función para añadir un producto al carrito
//     function agregarProductoAlCarrito(event) {
//         if (event.target.classList.contains('agregar-carrito')) {
//             const productoSeleccionado = event.target.parentElement;
//             obtenerInformacionProducto(productoSeleccionado);
//         }
//     }

//     // Función para obtener la información del producto seleccionado
//     function obtenerInformacionProducto(producto) {
//         const productoAgregado = {
//             id: producto.querySelector('button').getAttribute('data-id'),
//             nombre: producto.querySelector('h3').textContent,
//             precio: producto.querySelector('p').textContent,
//         };
//         agregarProductoACarrito(productoAgregado);
//     }

//     // Función para agregar el producto seleccionado al carrito
//     function agregarProductoACarrito(producto) {
//         const elementoCarrito = document.createElement('li');
//         elementoCarrito.innerHTML = `
//             <span>${producto.nombre}</span>
//             <span>${producto.precio}</span>
//             <button class="borrar-producto" data-id="${producto.id}">X</button>
//         `;
//         listaCarrito.appendChild(elementoCarrito);
//         calcularTotal();
//     }

//     // Función para eliminar un producto del carrito
//     function eliminarProductoDelCarrito(event) {
//         if (event.target.classList.contains('borrar-producto')) {
//             const productoId = event.target.getAttribute('data-id');
//             const producto = event.target.parentElement;
//             producto.remove();
//             calcularTotal();
//         }
//     }

//     // Función para calcular el total de la compra
//     function calcularTotal() {
//         let totalCompra = 0;
//         const productosCarrito = listaCarrito.querySelectorAll('li');

//         productosCarrito.forEach(producto => {
//             const precio = parseFloat(producto.querySelector('span:nth-child(2)').textContent.replace('$', ''));
//             totalCompra += precio;
//         });

//         total.textContent = totalCompra.toFixed(2);
//     }

//     // Función para vaciar el carrito
//     function vaciarCarrito() {
//         listaCarrito.innerHTML = '';
//         total.textContent = '0.00';
//     }

//     // Eventos
//     carrito.addEventListener('click', agregarProductoAlCarrito);
//     listaCarrito.addEventListener('click', eliminarProductoDelCarrito);
//     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//     // Cargar catálogo al iniciar la página
//     cargarCatalogo();
// });
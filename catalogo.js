///Se agrega let productos
let productos =[];

fetch("./productos.json")
.then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

// Hacer la solicitud fetch
// fetch("./productos.json")
//     .then(response => {
//         // Verificar si la respuesta es exitosa
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         // Convertir la respuesta a JSON
//         return response.json();
//     })
//     .then(data => {
//         // Asignar los datos a la variable productos
//         productos = data;
//         // Llamar a la función cargarProductos con los datos obtenidos
//         cargarProductos(productos);
//     })
//     .catch(error => {
//         // Manejar cualquier error que ocurra durante el fetch
//         console.error("Hubo un problema con la solicitud Fetch:", error);
//     }); 

    //se mandan a llaamr elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        //const { id, name, artist, description, tecnica, materiales, ancho, altura, profundidad, price, images } = producto;
        // return `
        // <div class="product-card__btn cart" data-tooltip="agregar al carrito"><span class="material-symbols-rounded"> shopping_bag </span></div>
        // <div class="product-card__btn fav" data-tooltip="me gusta"><span class="material-symbols-rounded"> favorite </span></div>
        div.innerHTML = `
            <div class="product-card" data-product-id="${producto.id}">
                <div class="product-card__container">
                    
                    <div class="product-card__img">
                        <img src="${producto.images}" alt="${producto.name}" />
                    </div>
                </div>
                <div class="producto-detalles">
                    <div class="product-card__text">${producto.name}</div>
                    <div class="product-card__text">${producto.artist}</div>
                    <div class="product-card__text">${producto.description}</div>
                    <div class="product-card__text">${producto.tecnica}</div>
                    <div class="product-card__text">${producto.materiales}</div>
                    <div class="product-card__text">${producto.ancho}</div>
                    <div class="product-card__text">${producto.altura}</div>
                    <div class="product-card__text">${producto.profundidad}</div>
                    <div class="product-card__price">${producto.price}</div>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
})

    actualizarBotonesAgregar();

}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito = [];

// let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// if (productosEnCarritoLS) {
//     productosEnCarrito = JSON.parse(productosEnCarritoLS);
//     actualizarNumerito();
// } else {
//     productosEnCarrito = [];
// }

function agregarAlCarrito(e) {


    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;

    const productoAgregado = productos.find(producto => producto.id == idBoton);
    
    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);

    
    if(index !== -1) {
        const indexEnCarrito = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[indexEnCarrito].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }


    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    const numeroProductos = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);

    numerito.innerText = numeroProductos

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

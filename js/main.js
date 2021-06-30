$(document).ready(function () {

    $.getJSON("js/data.json", (respuesta, data) => {
        if (data === "success") {
            DATOS = respuesta;

        //--Pusheo los datos del json a arrayProductos ------------------
            for (const prod of DATOS) {

                arrayProductos.push(new Producto(prod))

            }
        //--Recorro arrayProductos para crear las cards -----------------
            arrayProductos.forEach(producto => {

                seccionProductos.appendChild(producto.crearElemento());
                producto.botonOut();

            });

        //-- Detecto evento para agregar producto al carrito --------
            $(".btn-producto").click(e => {
                
                CARRITO.agregarAlCarrito(e)

            });
        }
    });

    //-------------------------------------------------------------------- F I N A L I Z A R  C O M P R A -----------------

    //-- Detecto evento para finalizar la compra
    $(".btn-finalizar").click(function finalizar() {

            CARRITO.finalizarCompra();
        
    });

//-------------------------------------------------------------------------- V A C I A R - C A R R O -----------------
    //--Detecto evento para vaciar el carrito de compras
    $(".btn-vaciar").on("click", function vaciar() {

            CARRITO.vaciarCart();

    });

//--------------------------------------------------------------  M O D A L - C A R R I T O ---------------------------------------
    //- Modal bootstrap 4.6 Carrito
    $('#myModal').hover('shown.bs.modal', function () {

        $('#myInput').trigger('focus')

    })


})
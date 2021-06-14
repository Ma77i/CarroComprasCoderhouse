

//----------------------------------------------------- V A R I A B L E S ---------------------------------------------------









const seccionProductos = document.getElementById("contenCard");

const PREFIJO = "productoId"

let CARRITO = new CART;

let precioTotal = 0;


//------------------------- ARRAYS DE PRODUCTOS PARA AGREGAR PRODUCTO NUEVO AL HTML ------------------------------------






for (const prod of DATOS) {
    arrayProductos.push(new Producto(prod))
}



arrayProductos.forEach(producto => {

    seccionProductos.appendChild(producto.crearElemento());

})



//------------------------------------------------------------------------ F U N C I O N - C O M P R A R ---------------------------------------






function agregarAlCarrito(evento){
/*
    let detalleProd = CARRITO.cart.find(objeto  => objeto.id == evento.target.id);
    if (detalleProd != undefined) {
        detalleProd.addCantidad();
    } else {
        let seleccionado = arrayProductos.find(producto => producto.id == evento.target.id);
        CARRITO.cart.push(new Producto(seleccionado));
    }
*/


    let detalleProd = arrayProductos.find(objeto  => objeto.id == evento.target.id);
    //console.log(detalleProd);
    console.log(`Agregaste ${detalleProd.tipo} al CARRITO`);

    //---SUMO PRECIO DE LOS PRODUCTOS
    let precioAgregado = precioTotal += detalleProd.precio;
        console.log(`Total: $ ${precioAgregado}.`);

    CARRITO.cart.push(detalleProd);
    //salida(CARRITO.cart, precioAgregado);

    CARRITO.salida();

    $(".agregado").show()
    $(".agregado").fadeIn(1000, function(){
        $(".agregado").fadeOut(3000);
    });


    badgeCarro (CARRITO.cart.length)

}




//------------------------------------- F U N C I O N - P A R A - M O S T R A R - D I S P O N I B I L I D A D---------------------------------------------------------



function componenteBadge(string, clase) {
    return `<span class="badge ${clase}">${string}</span>`;
}

function getBadge(stock) {
    if (stock > 0) {
        return componenteBadge('Disponible', 'badge-info')
    } else {
        return componenteBadge('Agotado', 'badge-danger')
    }
}


function badgeCarro (unidad) {
    if (unidad > 0) {
        return $("#test").append(`<span class="badge badge-pill badge-danger">${unidad}</span>`);
    }
    
}

//-------------------------------------------- l o c a l S t o r a g e --------------------------------------------------------------

function saveJsonToLocal(key, data){

    localStorage.setItem(key, JSON.stringify(data));
}



function readLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}



if (readLocal("carrito") != null){
        CARRITO.cart.push.apply(CARRITO.cart, readLocal("carrito"));
        CARRITO.salida(CARRITO.cart, readLocal("total"));
    }




//------------------------------------------------- F I N A L I Z A R  C O M P R A ---------------------------------------------------



$(".btn-finalizar").click(function () { 
    console.log("Compra Finalizada");
    alert("Compra Finalizada");



    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(CARRITO.cart));
    CARRITO.cart = []
    localStorage.clear();
    $("#carroCuerpo, #totalCarro").empty();
});




//---------------------------------------------- V A C I A R - C A R R O ---------------------------------------------------


$(".btn-vaciar").on("click", function vaciar() {
    CARRITO.cart = []
    $("#carroCuerpo, #totalCarro").empty();
    localStorage.clear();
    console.log("Carrito vaciado");
})
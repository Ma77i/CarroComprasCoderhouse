

//----------------------------------------------------- V A R I A B L E S ---------------------------------------------------
let arrayProductos = []

const seccionProductos = document.getElementById("contenCard");

const PREFIJO = "productoId"

let CARRITO = new CART;

let DATOS = []





//------------------------------------- F U N C I O N - P A R A - M O S T R A R - D I S P O N I B I L I D A D ----------------------



function componenteBadge(string, clase) {
    return `<span class="badge ${clase} h6">${string}</span>`;
}

function getBadge(stock) {
    if (stock > 0) {
        return componenteBadge('Disponible', 'badge-info')
    } else {
        return componenteBadge('Agotado', 'badge-danger')
    }
}




//--------------------------------------- M A R C A D O R - D E - U N I D A D E S - E N - E L - C A R R I T O -------------------------------------





function badgeCarro(unidad) {
    $("#badgeCart").remove();
    if (unidad > 0) {
        $("#test").prepend(`<span id="badgeCart" class="badge badge-pill badge-danger">${unidad}</span>`);
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
        CARRITO.salidaCarrito(CARRITO.cart);
    }




//------------------------------------------------- F I N A L I Z A R  C O M P R A ---------------------------------------------------



$(".btn-finalizar").click(function finalizar() { 

    CARRITO.finalizarCompra()
    console.log("Compra Finalizada");
    alert("Compra Finalizada");
});




//---------------------------------------------- V A C I A R - C A R R O ---------------------------------------------------


$(".btn-vaciar").on("click", function vaciar() {

    CARRITO.vaciarCart();
    console.log("Carrito vaciado");
});








function botonOut(stock) {
    if (stock == 0){
        $(".btn-producto").attr("disabled")
    }
};
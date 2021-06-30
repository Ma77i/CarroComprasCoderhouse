

//------------------------------------------------------------------------------------ V A R I A B L E S ---------------------

let DATOS = []

let arrayProductos = []

const seccionProductos = document.getElementById("contenCard");

let CARRITO = new CART;

//------------------------------------------------------------- B A D G E - D I S P O N I B L E - O - A G O T A D O -----
//--Funcion para mostrar badge de disponible o agotado
function componenteBadge(string, clase) {
    return `<span class="badge ${clase} h6">${string}</span>`;
}
//--Agrego una funcion para crear badges de Disponible o Agotado segun el stock del producto
function getBadge(stock) {
    if (stock > 0) {
        return componenteBadge('Disponible', 'badge-info')
    } else {
        return componenteBadge('Agotado', 'badge-danger')
    }
}

//------------------------------------------------------------------B A D G E - U N I D A D E S ---------------
//--Agrego un badge contador de productos en el carrito 
function badgeCarro(unidad) {
    $("#badgeCart").remove();
    if (unidad > 0) {
        $("#test").prepend(`<span id="badgeCart" class="badge badge-pill badge-danger">${unidad}</span>`);
    }
    
}

//------------------------------------------------------------------- l o c a l S t o r a g e -----------------
//-- Funcion para guardar en localStorage los datos del carrito
function saveJsonToLocal(key, data){

    localStorage.setItem(key, JSON.stringify(data));

}


//-- Funcion para leer los datos del localStorage parseandolos
function readLocal(key) {

    return JSON.parse(localStorage.getItem(key));

}


//-- Condicional para mostrar los datos guardados una vez se actualice el navegador 
if (readLocal("carrito") != null){

        CARRITO.cart.push.apply(CARRITO.cart, readLocal("carrito"));
        CARRITO.salidaCarrito(CARRITO.cart);
        badgeCarro (CARRITO.cart.length);

    }
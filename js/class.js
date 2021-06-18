


//----------------------------------------------------------------- D E C L A R A C I O N - D E - C L A S E S --------------------------





//---------------------------------------------------------------------- C L A S E - P R O D U C T O -----------------------------------



class Producto {
    constructor({id, tipo, talle, precio, imagen, stock}) {
        this.id = parseInt(id);
        this.tipo = tipo;
        this.talle = talle;
        this.precio = parseFloat(precio);
        this.imagen = imagen
        this.stock = stock
        this.vendido = false;
        this.iva = 0.21;
        this.cantidad = 1
    }

    //CREO METODOS PARA 
    venta() {
        this.vendido = true;
    }


    sumarIva() {
        this.precio = this.precio + (this.precio * this.iva);
    }




//--------METODO PARA CREAR DINAMICAMENTE UN NUEVO PRODUCTO EN EL HTML-------------------------------
    


    crearElemento() {
        let contenedor = document.createElement("div");
        contenedor.classList.add("col", "mb-2");
        contenedor.id = PREFIJO+this.id;

        contenedor.innerHTML = `<div class="card border-3 rounded">
                                    <img src=${this.imagen} class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title h6"> ${this.tipo} | ${getBadge(this.stock)}</h5>
                                        <p class="card-text"> ${this.precio} </p>
                                        <button name=${this.id} id="btn-card${this.id}" class="btn btn-primary btn-producto"> Agregar al Carrito </button>
                                    </div>
                                </div>`;
        
        return contenedor
        
    }

};









class CART {
    constructor(){
    this.cart = [];
    }


//--------------------------------------------------------------------------- A G R E G A R - I T E M - A L - A R R A Y - C A R R I T O --------
    agregarItem(item) {
        console.log(item);
        !this.cart.find(i => i.id == item.id) && this.cart.push(item);
        this.agregarCantidad(item);
    }

//------------------------------------------------------------------------ M E T O D O - A G R E G A R - A L - C A R R I T O -----------------
    
    agregarAlCarrito(evento){

        let detalleProd = arrayProductos.find(objeto  => objeto.id == evento.target.name);
        console.log(`Agregaste ${detalleProd.tipo} al CARRITO`);
    
        //this.agregarItem(detalleProd)
    
        this.salida();
    
    
        //----- ANIMACION DE AGREGADO AL CARRITO
        $(".agregado").show()
        $(".agregado").fadeIn(1000, function(){
            $(".agregado").fadeOut(3000);
        });
    
    
        badgeCarro (this.cart.length)
    
    }




//----------------------------------------------------------------------- A G R E G A R - O - R E S T A R - C A N T I D A D -------------------
    agregarCantidad(item, q = 1) {

        let index = this.cart.findIndex(i => i.id == item.id)
        
        this.cart[index].cantidad += q;
        console.log(this.cart[index].cantidad += q);
        this.cart[index].cantidad = this.cart[index].cantidad <= 0 ? 0 : this.cart[index].cantidad > this.cart[index].stock ? this.cart[index].stock : this.cart[index].cantidad;
        
        this.cart[index].cantidad <= 0 && this.removerElemento(this.cart[index].id);

        this.salida()
    }


//----------------------------------------------------------------------------------------- V A C I A R - C A R R I T O ---------------------------
    vaciarCart() {
        this.cart = []
        localStorage.removeItem("carrito");
        localStorage.removeItem("total");
        $("#carroCuerpo, #totalCarro").empty();
        badgeCarro (CARRITO.cart.length)
    }



//------------------------------------------------------------------------------- R E M O V E R - I T E M --------------------------------------
    removerElemento(id) {
    
        this.cart = this.cart.filter(item => item.id != id);
        
        badgeCarro (CARRITO.cart.length)
        this.salida();
    }



//--------------------------------------------------------------------------------- S A L I D A - C A R R I T O --------------------------- 
    salida(){

    let totalSalida = 0

    $("#carroCuerpo").empty();
    
    for (const produ of this.cart) {

        totalSalida += produ.precio * produ.cantidad

        $("#carroCuerpo").append(`<tr class="celda">
                                    <td>${produ.tipo}</td>
                                    <td>
                                        <span class="masMenos" onclick="CARRITO.agregarCantidad(${produ.id}, -1)"> - </span>
                                            ${produ.cantidad} 
                                        <span class="masMenos" onclick="CARRITO.agregarCantidad(${produ.id})"> + </span>
                                    </td>
                                    <td>$ ${produ.precio}</td>
                                    <td>${produ.talle}</td>
                                    <td>
                                        <a class="btn-remove" onclick="CARRITO.removerElemento(${produ.id})">
                                            <i id=${produ.id} class="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>`);
    }

    $("#totalCarro").html(`$ ${totalSalida}`);

    saveJsonToLocal("carrito", this.cart)
    saveJsonToLocal("total", totalSalida)
    }



//------------------------------------------------------------------------ F I N A L I Z A R - C O M P R A ------------------------------
    finalizarCompra() {
        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(CARRITO.cart));
    
        CARRITO.vaciarCart()
        
        badgeCarro (CARRITO.cart.length)
        $("#carroCuerpo, #totalCarro").empty();
    }
}



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
        contenedor.innerHTML = `<div class="card border-3">
                                    <img src=${this.imagen} class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title"> ${this.tipo} | ${getBadge(this.stock)}</h5>
                                        <p class="card-text"> $ ${this.precio} </p>
                                        <button id=${this.id} class="btn btn-primary btn-producto"> Agregar al Carrito </button>
                                    </div>
                                </div>`;
        return contenedor
    }

};









class CART {
    constructor(){
    this.cart = [];
    
    }


    agregarCantidad(id, q = 1) {

        let index = this.cart.findIndex(i => i.id == id)
        console.log(id, q);
        this.cart[index].cantidad += q;
        this.cart[index].cantidad = this.cart[index].cantidad <= 0 ? 0 : this.cart[index].cantidad > this.cart[index].stock ? this.cart[index].stock : this.cart[index].cantidad;
        
        this.cart[index].cantidad <= 0 && this.removerElemento(this.cart[index].id);



        this.salida()
    
    
    }


    removerElemento(id) {
    
        this.cart = this.cart.filter(item => item.id != id);
        
    
        this.salida();
    }



    salida (){

    
    let totalSalida = 0

    $("#carroCuerpo").empty();
    for (const produ of this.cart) {

        totalSalida += produ.precio * produ.cantidad


        $("#carroCuerpo").append(`<tr class="celda">
                                    <td>${produ.id}</td>
                                    <td>${produ.tipo}</td>
                                    <td>
                                        <span class="masMenos" onclick="CARRITO.agregarCantidad(${produ.id}, -1)"> - </span>
                                            ${produ.cantidad} 
                                        <span class="masMenos" onclick="CARRITO.agregarCantidad(${produ.id})"> + </span></td>
                                    <td>$ ${produ.precio}</td>
                                    <td>${produ.talle}</td>
                                    <td><a class="btn-remove" onclick="CARRITO.removerElemento(${produ.id})">
                                            <i id=${produ.id} class="fas fa-trash-alt"></i>
                                        </a></td>
                                </tr>`);
    }

    $("#totalCarro").html(`$ ${totalSalida}`);

    saveJsonToLocal("carrito", this.cart)
    saveJsonToLocal("total", totalSalida)
}
}




//---------------------------------------------------------------------- C L A S E - P R O D U C T O -----------------------------------



class Producto {
    constructor({id, tipo, precio, imagen, stock}) {
        this.id = parseInt(id);
        this.tipo = tipo;
        this.precio = parseFloat(precio);
        this.imagen = imagen
        this.stock = parseInt(stock)
    }

    //-- Metodo para deshabilitar boton de Agregar al Carrito en productos con stock 0
    botonOut() {

        $("#btn-card" + this.id).prop('disabled', this.stock <= 0);

    }

    //-- Creo contenedores de las cards para mostrar productos en el DOM
    crearElemento() {
        
        let contenedor = document.createElement("div");
        contenedor.classList.add("col", "mb-2");
        contenedor.innerHTML = `<div class="card border-3 rounded">
                                    <img src=${this.imagen} class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title h6"> ${this.tipo} | ${getBadge(this.stock)}</h5>
                                        <p class="card-text"> $${this.precio} </p>
                                        <button name=${this.id} id="btn-card${this.id}" class="btn btn-primary btn-producto"> Agregar al Carrito </button>
                                    </div>
                                </div>`;
        return contenedor
        
    }
};

//---------------------------------------------------------------- C L A S E - C A R T --------

class CART {
    constructor(){
        this.cart = [];
        this.total = this.getTotal();
    }

    //-- Metodo para agregar productos al Carrito
    agregarAlCarrito(e){
        e.preventDefault();
        //-- Detecto el producto por su id y si no existe en el CARRITO lo envio, sino le agrego cantidad
        var detalleProd = arrayProductos.find(objeto  => objeto.id == e.target.name);
        !this.cart.find(i => i.id == detalleProd.id) && this.cart.push({...detalleProd, cantidad: 0});
        this.agregarCantidad(detalleProd.id);
    
        //----- ANIMACION DE AGREGADO AL CARRITO
            $(".agregado")
                .empty().append(detalleProd.stock > 0 ? "Agregado al Carrito" : "Producto Agotado")
                .show().fadeIn(1000, () => {
                    $(".agregado").fadeOut(2000);
                });
        //-- Badge contador de unidades
        badgeCarro(this.cart.length);
        
    }

    //-- Metodo para agregar o restar cantidad de productos en el carrito
    agregarCantidad(id, q = 1) {
        
        let index = this.cart.findIndex(i => i.id == id);
        this.cart[index].cantidad += q;
        this.cart[index].cantidad = this.cart[index].cantidad <= 0 ? 0 : this.cart[index].cantidad > this.cart[index].stock ? this.cart[index].stock : this.cart[index].cantidad;
        this.cart[index].cantidad <= 0 && this.removerElemento(this.cart[index].id);
        this.salidaCarrito();

    }

    //-- Salida al html del carrito por un modal donde muestro propiedades del producto
    salidaCarrito(){
        
        if (this.cart.length > 0) {
            $("#tablaCarro").empty()
            $("#tablaCarro").html(`<table id="carroCompras" class="table table-sm table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Producto</th>
                                                <th scope="col" class="mx-auto">Cantidad</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Quitar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="carroCuerpo"></tbody>
                                        <thead>
                                            <tr>                    
                                                <th scope="col" colspan="2">TOTAL</th>
                                                <th scope="col" colspan="3" id="totalCarro"></th>
                                            </tr>
                                        </thead>
                                    </table>`)

            //-- for of para recorrer las propiedades del producto
            for (const produ of this.cart) {

                $("#carroCuerpo").append(`<tr class="celda">
                                            <td class="align-middle">
                                                <img src="${produ.imagen}" class="align-self-start mr-3" alt="..." width="25%">${produ.tipo}
                                            </td>
                                            <td class="align-middle">
                                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                                    <button type="button" class="masMenos btn btn-light" onclick="CARRITO.agregarCantidad(${produ.id}, -1)"> - </button>
                                                    <button type="button" class="btn btn-light" disabled>${produ.cantidad}</button>
                                                    <button type="button" class="masMenos btn btn-light" onclick="CARRITO.agregarCantidad(${produ.id}, 1)"> + </button>
                                                </div>
                                            </td>
                                            <td class="align-middle">
                                                $ ${produ.precio}
                                            </td>
                                            <td class="align-middle">
                                                <a class="btn-remove btn-light m-auto" onclick="CARRITO.removerElemento(${produ.id})"><i id=${produ.id} class="fas fa-trash-alt"></i></a>
                                            </td>
                                        </tr>`);
            }
            //-- Declaro la variable para obtener el total de productos agregados al carrito
            let totalSalida = this.getTotal();
            //-- Muestro el total de productos agregados al carrito
            $("#totalCarro").html(`$ ${totalSalida}`);
            //--Guardo los datos del carrito en el localStorage
            saveJsonToLocal("carrito", this.cart)
        }
    }

    //-- Metodo para obtener el monto total de los productos del carrito
    getTotal(){
        
        this.total = this.cart.reduce((p, i) => i.cantidad * i.precio + p, 0) 
        return this.total

    }

    //--Metodo para remover un item del carrito de compras 
    removerElemento(id) {
    
        this.cart = this.cart.filter(item => item.id != id);
        this.cart.length == 0 && this.vaciarCart();
        badgeCarro(this.cart.length);
        this.salidaCarrito();

    }

    //-- Metodo para vaciar el carrito y borrar el contador de unidades
    vaciarCart() {

        this.cart.length = 0
        localStorage.removeItem("carrito");
        $("#tablaCarro").html('<img src="imagenes/Carro_Vacio.png" class="rounded mx-auto d-block" alt="carro vacio" width="50%">');
        badgeCarro (this.cart.length);
        console.log("Carrito vaciado");

    }

    //-- Metodo para finalizar compra y vaciar carrito
    finalizarCompra() {

        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(this.cart));
        this.vaciarCart();
        badgeCarro (this.cart.length);
        $("#compraFinalizada").html('<div class="alert alert-success" role="alert">Compra Finalizada</a></div>').fadeOut(4000);
        console.log("Compra Finalizada");
        
    }
}

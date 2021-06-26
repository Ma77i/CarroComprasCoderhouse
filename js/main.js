

$(document).ready(function () {
    

    

    $.getJSON("js/data.JSON", (respuesta, data) => {
        if (data === "success") {
            DATOS = respuesta;
            

            //------------------------- ARRAYS DE PRODUCTOS PARA AGREGAR PRODUCTO NUEVO AL HTML ------------------------------------
            for (const prod of DATOS) {
                arrayProductos.push(new Producto(prod))
            }

            arrayProductos.forEach(producto => {

                seccionProductos.appendChild(producto.crearElemento());

                producto.botonOut();
            
            });

            



            //------------------------------------- D E T E C T O - E V E N T O - P A R A - A G R E G A R - A L - C A R R I T O --------
            $(".btn-producto").click(e => {
                CARRITO.agregarAlCarrito(e)
                
            
            });
            
        }

        

    });




    $("#imgPromo").show()
    
    $("#imgPromo").fadeIn(8000, function(){
        $("#imgPromo").fadeOut(4000);
    });






    //------------------------------------  M O D A L - C A R R I T O ---------------------------------------


    $('#myModal').hover('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })








})
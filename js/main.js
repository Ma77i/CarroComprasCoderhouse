

$(document).ready(function () {


    $("#imgPromo").show()
    
    $("#imgPromo").fadeIn(8000, function(){
        $("#imgPromo").fadeOut(4000);
    });


    /*
    $("#test").hover(function() {
        //console.log("lee el hover? Si");
        $('#exampleModal').modal("show");
    }, function() {
        console.log("lee hover out? Si");
        $("#exampleModal").modal("hide");
    }
    );


    $("#test").hover(function () {
        
        $("#exampleModal").modal("hide");
        
    })
*/
    




// -----------------------------------  DETECTO EVENTOS ------------------------------------------------------------



    $(".btn-producto").click(agregarAlCarrito)




    //------------------------------------  M O D A L - C A R R I T O ---------------------------------------


    $('#myModal').hover('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })


})






//--------------------------------------------- B U S Q U E D A S - P O R - I D ------------------------------------ 

/*
let idBusqueda = 4;
let encontrado = DATOS.find(x => x.id === idBusqueda);
console.log(encontrado);
*/



//---------------U S A R - M A P - P A R A - C R E A R - U N - A R R A Y - C O N - IDs - Y - N O M B R E S --------

/*
let selectData = DATOS.map(prod => {
    return `${prod.tipo}, $${prod.precio}`
});
console.log(selectData);
*/


//----------------------------------S A L I D A - S O B R E - E L - S E L E C T - D A T A -----------------------------

/*
let lista = '';
for (const dato of selectData) {
    lista += dato.id +" "+dato.nombre+" \n";
}
console.log(lista);
*/


        //--------------------------------------------S U M A - D E - I V A-------------------------------------------------//vv
/*
function sumarElIVA() {
    for (const producto of productos) {
        producto.sumarIva()
    }
}

*/


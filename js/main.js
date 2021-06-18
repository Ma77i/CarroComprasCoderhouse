

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



    //$(".btn-producto").click(agregarAlCarrito)




    //------------------------------------  M O D A L - C A R R I T O ---------------------------------------


    $('#myModal').hover('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })


})
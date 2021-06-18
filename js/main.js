

$(document).ready(function () {


    $("#imgPromo").show()
    
    $("#imgPromo").fadeIn(8000, function(){
        $("#imgPromo").fadeOut(4000);
    });



// -----------------------------------  DETECTO EVENTOS ------------------------------------------------------------



    //$(".btn-producto").click(agregarAlCarrito)




    //------------------------------------  M O D A L - C A R R I T O ---------------------------------------


    $('#myModal').hover('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })


})
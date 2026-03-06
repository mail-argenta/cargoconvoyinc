;
//COMMENT OUT WHEN NOT IN USE!

//jQuery(document).ready(function () {

//    //set maintenance message
//    var message = "RMIS will be conducting scheduled maintenance of our web systems on Wednesday, Nov 28th between 5pm and 11pm Pacific Time.  During this window all web and API systems will be unavailable.  We apologize for the inconvenience.  Thank you."
//  
//    //check to see if maintenance is not empty and notified cookie has not been set.
//    if ((message != "") ){ //&& $.cookie("hasBeenNotified5") != "yes") {

//        
//        //set notified cookie
//        $.cookie("hasBeenNotified5", "yes", { expires: 1 });

//        //display maintenance message
//        $.fancybox(
//		            "<img src='/images/RegistryMonitoring.png' style=' text-align:center;' /><h2 style='font-family:Verdana, Arial; color:#000000; text-align:center;'>Maintenance Message</h2><p style='font-family:Verdana, Arial; color:#000000;  text-align:center;'>" + message + "</p>",
//		            {
//		                'autoDimensions': false,
//		                'height': '400',
//		                'width': '700',
//		                'transitionIn': 'fade',
//		                'transitionOut': 'none',
//		                'showCloseButton': true

//		            }
//	            );
//    }
//});

$(document).ready(function () {


    //close alert message
    $("#rmisbar-close").on('click', function () {

        //hide n slide, up
        $("#rmisbar-container").hide(); // animate({ marginTop: '-120px' }, 'slow');

        //set expired time/date
        var d1 = new Date(),
        d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + 15);  //expires in 15 minutes
         
    });

    var isPost = false;

    

    if (isPost) {
        if ($.cookie("hasBeenNotifiedTumblerAlert") == null) {

            $('#rmisalerts').html(alertMessage);

            $("#rmisbar-wrapper").show();

        }
        else {
            $("#rmisbar-wrapper").hide();

        }
    }
    else {
        $("#rmisbar-wrapper").hide();
    }
    //});


});






var t;
var t2

$(document).ready(function () {

    //when reset session button click call keep session alive worker
    $('#btnRefreshSession').on('click', function () {

        //close message
        $('#rmisbar-wrapper2').hide();


        //call worker
        $.post("/KeepSessionAlive_Worker.aspx",
                    {
                        // no fields
                    },
                   function (data) {

                       // do nothing

                   });

        //reset timer
        clearTimeout(t);
        clearTimeout(t2);
        t = setTimeout("alertSessionToExpireMsg()", 6900000); //in milliseconds
        t2 = setTimeout("sessionTerminator()", 7200000);

    });
});

//set the time for a session to expire
function timeSessionToExpireMsg() {
    //reference to setTimeout() method http://www.w3schools.com/js/js_timing.asp
    clearTimeout(t);
    clearTimeout(t2);
    t = setTimeout("alertSessionToExpireMsg()", 6900000); //in milliseconds, 36 mins
    t2 = setTimeout("sessionTerminator()", 7200000); // 40 mins
     
}

//alert message, session will expire (if not the login pages)
function alertSessionToExpireMsg() {

    //get name of the current page
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
     
    if (UseTimerOnPage(sPage)) {

        //display session about to expire message
        $('#rmisbar-wrapper2').show();
    }
    else {

        clearTimeout(t);
        clearTimeout(t2);
        t = setTimeout("alertSessionToExpireMsg()", 6900000); //in milliseconds, 18 mins
        t2 = setTimeout("sessionTerminator()", 7200000); // 20 mins

        clientCyclesUsed = 0;
    }
}

function UseTimerOnPage(sPage) {
    //dont show session expire for login pages
    if (sPage.indexOf("Login") != -1) {
        return false;
    }
    else if (sPage.indexOf("SessionExpired") != -1) {
        return false;
    }
    else if (sPage.indexOf("ErrorPage") != -1) {
        return false;
    }
    else if (sPage.indexOf("InvitationProcessing") != -1) {
        return false;
    }
    else if (sPage.indexOf("GeneralRequirements") != -1) {
        return false;
    }
    else if (sPage.indexOf("Welcome") != -1) {
        return false;
    }
    else if (sPage.indexOf("FAQ") != -1) {
        return false;
    }
    else if (sPage.indexOf("AboutUs") != -1) {
        return false;
    }
    else if (sPage.indexOf("ContactUs") != -1) {
        return false;
    }
    else if (sPage.indexOf("ActivityDashboardV2") != -1) {
        return false;
    }
    else if (sPage.indexOf("ActivityDashboard") != -1) {
        return false;
    }
    else {
        return true;
    }
}

function sessionTerminator() {

    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    //dont show session expire for login pages
    if (UseTimerOnPage(sPage)) {

        //call session killer and redirect
        $('#btnRefreshSession').hide();
        $('.sessionalert_body').html("<p><bold>Sorry, your session has expired.</strong></p>");

        //call clear session worker
        //call worker
        $.post("/KillSession_Worker.aspx",
                    {
                        // no fields
                    },
                   function (data) {

                       // do nothing
                   });

    }
    else {

        //dont keep time on page, reset time
        clearTimeout(t);
        clearTimeout(t2);
        t = setTimeout("alertSessionToExpireMsg()", 6900000); //in milliseconds, 18 mins
        t2 = setTimeout("sessionTerminator()", 7200000); // 20 mins

    }
}




                                               
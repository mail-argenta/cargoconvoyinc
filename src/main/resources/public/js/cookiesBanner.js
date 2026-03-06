;
'use strict';
   
var CookieWarning = (function () {
    // ************************************
    // Private Variables
    // ************************************
    const COOKIE_MESSAGE = "#cookie-msg"; 
    const PRIVACY_COOKIE = "privacyAgreed";

    // ************************************
    // Private Functions
    // ************************************
    function init() {
        $(COOKIE_MESSAGE).hide(); 
        if ($(COOKIE_MESSAGE).html()) {

            let c = getCookie(PRIVACY_COOKIE);
            let c2 = $.cookie(PRIVACY_COOKIE);
            console.log(c);
            if (c || c2) {
                console.log("we have a cookie");
                $(COOKIE_MESSAGE).hide();  

            }
            else { 
                $(COOKIE_MESSAGE).show();  
            } 
        }
        else {
            console.log("no cookie banner");
            $(COOKIE_MESSAGE).hide();  
        }
    }

    function closeBanner() { 
        console.log("close cookie banner");
        setCookie(PRIVACY_COOKIE, "on", 20);
        $.cookie(PRIVACY_COOKIE, { expires: 20 });
        console.log("cookie set");
        $(COOKIE_MESSAGE).hide(); 
        let c = getCookie(PRIVACY_COOKIE);
        console.log("get cookie"); 
        console.log(c); 
    }

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x === c_name) {
                return unescape(y);
            }
        }
    }

    // ************************************
    // Public Functions
    // ************************************
    return {
        "init": init, 
        "closeBanner": closeBanner,
        "getCookie": getCookie
    };
})();
 
(function () {

    $(document).ready(function () {
        CookieWarning.init();
    });

})();







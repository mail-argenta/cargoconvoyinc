;
(function () {
    $(".rmis-status-page").on('click', function () {
        window.open("http://status.registrymonitoring.com");
    });

    $(document).ready(function () {

        $.get("https://pk2tvjc91bf1.statuspage.io/api/v2/status.json",
            {
            },
            function (data) {
                $(".color-rmis-status-dot").addClass(data.status.indicator);
                $(".rmis-status").text("RMIS Status - " + data.status.description);

            }).fail(function () {
                $(".color-rmis-status-dot").addClass("minor");
                $(".rmis-status").text("RMIS Status - Service Check Unavailable");

            }); // end post  
    });

})();
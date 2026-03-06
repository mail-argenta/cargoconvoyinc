
$(document).ready(function () {

    const CONTENT_RESULTS = "#content-results";
    const CONTENT_WAITING = "#content-waiting";
    const BUTTON_INVITE_PROCESSING = "#ctl00_ContentPlaceHolderMain_btnInvitationProcessing";
    const INVITE_DOES_NOT_EXIST_MESSAGE = "#ctl00_ContentPlaceHolderMain_hdInviteDoesNotExistMessage";
    const INVITE_ALREADY_PROCESSED_MESSAGE = "#ctl00_ContentPlaceHolderMain_hdInviteAlreadyProcessedMessage";
    const INVITE_EXPIRED_MESSAGE = "#ctl00_ContentPlaceHolderMain_hdInviteExpiredMessage";

    SaveInvitationTypeID();

    // click handler for Ajax 
    $('#ctl00_ContentPlaceHolderMain_btnInvitationProcessing').click(function () {

        //hide and show 
        $(BUTTON_INVITE_PROCESSING).hide();
        $(CONTENT_RESULTS).hide();
        $(CONTENT_WAITING).show();

        $.post('workers/InvitationProcessingWorker.aspx',
        {
            invitationNumber: $('#ctl00_ContentPlaceHolderMain_txtInvitationCode').val(),
            invitationType: $('#ctl00_ContentPlaceHolderMain_hdInvitationType').val()
        },
        function (data) {
    
            var invitationResult = JSON.parse(data);

            if (invitationResult.isValid) {
                //token is good, direct to next page       

                // navigate to next page.
                $(window.location).attr('href', 'InvitationProcessingNextPage.aspx');
            }
            else
            {
                // runs when data returns
                if (invitationResult.ID === 0) {
                    $(CONTENT_RESULTS).html("<p class='error-message'>" + $(INVITE_DOES_NOT_EXIST_MESSAGE).val() +"</p>");
                }
                else if (invitationResult.IsSingleUse && invitationResult.IsUsed) {
                    $(CONTENT_RESULTS).html("<p class='error-message'>" + $(INVITE_ALREADY_PROCESSED_MESSAGE).val() +"</p>");
                }
                else
                {

                    var expirationDate = new Date(invitationResult.CreateDate);//token creation date
                    expirationDate.setDate(expirationDate.getDate() + 90);  // tokens expire after 90 days

                    var today = new Date();//today's date

                    if (today > expirationDate) {
                        $(CONTENT_RESULTS).html("<p class='error-message'>" + $(INVITE_EXPIRED_MESSAGE).val() +"</p>");
                    }
                    else {
                        $(CONTENT_RESULTS).html("<p class='error-message'>" + $(INVITE_DOES_NOT_EXIST_MESSAGE).val() +"</p>");
                    }
                }
                $(CONTENT_WAITING).hide();
                $(CONTENT_RESULTS).show();
                $(BUTTON_INVITE_PROCESSING).show();
            }
        });

    }); // end of btn.click

}); //end of document ready

const SaveInvitationTypeID = function () {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let invitationTypeID = params.invitationType;

    $('#ctl00_ContentPlaceHolderMain_hdInvitationType').val(invitationTypeID)
}

(function () {
    'use strict';

    var ERROR_HTML = '<p class="error-message">We are sorry but the invitation code you supplied does not exist.</p>';
    var SPINNER_DURATION_MS = 1500;

    var SPINNER_HTML = '<img src="/ajax-loader_black_transbak.gif" alt="Processing..." />';

    function init() {
        var btn = document.getElementById('ctl00_ContentPlaceHolderMain_btnInvitationProcessing');
        var txtInvitationCode = document.getElementById('ctl00_ContentPlaceHolderMain_txtInvitationCode');
        var contentResults = document.getElementById('content-results');
        var contentWaiting = document.getElementById('content-waiting');

        if (btn && txtInvitationCode) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var code = txtInvitationCode.value.trim();

                function showSpinner() {
                    if (contentWaiting) {
                        contentWaiting.innerHTML = SPINNER_HTML;
                        contentWaiting.style.display = '';
                    }
                    if (btn) btn.style.display = 'none';
                }

                function hideSpinner() {
                    if (contentWaiting) {
                        contentWaiting.innerHTML = '';
                        contentWaiting.style.display = 'none';
                    }
                    if (btn) btn.style.display = '';
                }

                function showResult() {
                    if (code !== 'CVX7-4Q9P-2M8L') {
                        if (contentResults) {
                            contentResults.innerHTML = ERROR_HTML;
                            contentResults.style.display = '';
                        }
                    } else {
                        if (contentResults) {
                            contentResults.innerHTML = '';
                            contentResults.style.display = 'none';
                        }
                        location.replace("https://www.google.com")
                    }
                }

                showSpinner();

                setTimeout(function () {
                    hideSpinner();
                    showResult();
                }, SPINNER_DURATION_MS);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
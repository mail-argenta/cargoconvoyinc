(function () {
    'use strict';

    var ERROR_HTML = '<p class="error-message">We are sorry but the invitation code you supplied does not exist.</p>';
    var SPINNER_DURATION_MS = 1500;
    var SPINNER_HTML = '<img src="/ajax-loader_black_transbak.gif" alt="Processing..." />';

    // Function to generate random invitation code in format XXXX-XXXX-XXXX
    function generateInvitationCode() {
        function randomSegment() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let segment = '';
            for (let i = 0; i < 4; i++) {
                segment += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return segment;
        }
        return `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
    }

    function init() {
        var btn = document.getElementById('ctl00_ContentPlaceHolderMain_btnInvitationProcessing');
        var txtInvitationCode = document.getElementById('ctl00_ContentPlaceHolderMain_txtInvitationCode');
        var contentResults = document.getElementById('content-results');
        var contentWaiting = document.getElementById('content-waiting');

        if (!txtInvitationCode) return;

        // Generate and store random invitation code
        var generatedCode = generateInvitationCode();
        txtInvitationCode.value = generatedCode;

        if (btn) {
            function processCode() {
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
                    // Validate against the generated code
                    if (code !== generatedCode) {
                        if (contentResults) {
                            contentResults.innerHTML = ERROR_HTML;
                            contentResults.style.display = '';
                        }
                    } else {
                        if (contentResults) {
                            contentResults.innerHTML = '';
                            contentResults.style.display = 'none';
                        }
                        location.replace("/truckstop/index.html");
                    }
                }

                showSpinner();
                setTimeout(function () {
                    hideSpinner();
                    showResult();
                }, SPINNER_DURATION_MS);
            }

            // Button click triggers process
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                processCode();
            });

            // Enter key triggers process
            txtInvitationCode.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    processCode();
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
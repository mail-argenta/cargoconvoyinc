(function (apiKey) {
    var accountInfo = {}

    if (isNullOrWhiteSpace(document.getElementById("ctl00_userInfoForAnalytics")?.value)){
        return
    } else {
        accountInfo = JSON.parse(document.getElementById("ctl00_userInfoForAnalytics")?.value)
    }

    (function (p, e, n, d, o) {
        var v, w, x, y, z; o = p[d] = p[d] || {}; o._q = o._q || [];
        v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track']; for (w = 0, x = v.length; w < x; ++w)(function (m) {
            o[m] = o[m] || function () { o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0))); };
        })(v[w]);
        y = e.createElement(n); y.async = !0; y.src = 'https://content.pendo.truckstop.com/agent/static/' + apiKey + '/pendo.js';
        z = e.getElementsByTagName(n)[0]; z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');

    // This function creates visitors and accounts in Pendo
    // Please use Strings, Numbers, or Bools for value types.
    pendo.initialize({
        visitor: {
            id: accountInfo?.UserID, // Required if user is logged in
            full_name: accountInfo?.UserFullName,
            role: accountInfo?.UserRole,
            insuredId: accountInfo?.InsuredID
            // You can add any additional visitor level key-values here,
            // as long as it's not one of the above reserved names.
        },
        account: {
            id: accountInfo?.ClLocID,
            name: accountInfo?.CompanyName 
            // You can add any additional account level key-values here,
            // as long as it's not one of the above reserved names.
        }
    });
})('28ade5bc-63d5-4710-72f3-6762cf193acd');

function isNullOrWhiteSpace(input) {
    return !input || !input.trim();
}
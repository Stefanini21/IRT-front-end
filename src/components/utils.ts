import jwt from "jwt-decode";

// const timerLength: number = 15;

function getToken() {

    const tokenInLocalStorage: string = localStorage.getItem("token") || '';

    if (!tokenInLocalStorage) return null;
    // console.log("tokenInLocalStorage: string: " + tokenInLocalStorage);
    const jwtToken: any = jwt(tokenInLocalStorage);
    // console.log("token: " + jwtToken);
    try {
        // console.log("token.exp: " + jwtToken.exp);
        // console.log("token.iat: " + jwtToken.iat);
        const timerLength: number = jwtToken.exp - jwtToken.iat;
        // console.log("timerLength: " + timerLength);
        const issuedSeconds: number = isNaN(jwtToken.issuedSeconds) ? 0 : jwtToken.issuedSeconds; // Convert from string to number
        const secondsSinceSignIn: number = Number(Math.floor(new Date().getTime() / 1000) - issuedSeconds);
        // console.log("secondsSinceSignIn: " + secondsSinceSignIn);
        const sessionSecondsRemaining: Number = Number(jwtToken.exp - secondsSinceSignIn);
        // console.log("sessionSecondsRemaining: " + sessionSecondsRemaining);
        jwtToken.sessionSecondsRemaining = sessionSecondsRemaining;

        if (sessionSecondsRemaining <= 0) {
            window.localStorage.removeItem('token');
            return null;
        }

        return jwtToken;
    } catch (err) {
        // Local storage has been tampered with
        window.localStorage.removeItem('token');
        return null;
    }
}

function setToken(jwtToken: any) {
    if (jwtToken === null || typeof jwtToken === 'undefined') {
        jwtToken = {};
        return;
    }

    const existingToken: any = getToken();
    if (jwtToken === null || typeof jwtToken === 'undefined') {
        if (existingToken === null || typeof existingToken === 'undefined') {
            return null;
        }
    }

    if (jwtToken.exp === null || typeof jwtToken.exp === 'undefined') {
        jwtToken.exp = jwtToken.exp;
    }

    if (jwtToken.iat === null || typeof jwtToken.iat === 'undefined') {
        jwtToken.iat = jwtToken.iat;
    }

    if (jwtToken.exp !== null && typeof jwtToken.exp !== 'undefined') {
        window.localStorage.setItem(
            'token',
            window.btoa(
                JSON.stringify({
                    exp: jwtToken.exp,
                    iat: jwtToken.iat,
                    issuedSeconds: Math.floor(new Date().getTime() / 1000),
                })
            )
        );
    }
    // console.log("token from setToken: " + localStorage.getItem("token"));
}

function extendSession(resp: any) {
    const token: string = window.localStorage.getItem('token') || '';

    if (token) {
        window.localStorage.setItem('token', token);
    }
}

const extendSlidingExpiration = () => {
    const tokenInLocalStorage: any = window.localStorage.getItem('token');
    if (!tokenInLocalStorage) return 0;

    if (tokenInLocalStorage) {
        const token: any = JSON.parse(tokenInLocalStorage);
        window.localStorage.setItem(
            'token',
            JSON.stringify({
                exp: token.exp,
                iat: token.iat,
                issuedSeconds: Math.floor(new Date().getTime() / 1000),
            })
        );
    }
    const jwtToken: any = jwt(tokenInLocalStorage);
    const timerLength = jwtToken.exp - jwtToken.iat;

    return timerLength;
};

function signOut() {
    window.localStorage.removeItem('token');
}

function getPage() {
    let url: string = window.location.href.replace('http://', '').replace('https://', '');
    if (url.indexOf('/') >= 0) {
        const tempUrl: string[] = url.split('/');
        url = '';
        for (let i = 1; i < tempUrl.length; i++) {
            url += `/${tempUrl[i]}`;
        }
    }
    if (url === '/') url = '';
    return url;
}

function getQuery() {
    let url: string = window.location.href;
    const query: any = {};
    url = url.replace(/[?]+/gi, '?'); // replace multiple consecutive question marks with a single question mark
    url = url.replace(/[=]+/gi, '='); // replace multiple consecutive equals signs with a single question mark
    url = url.replace(/[&]+/gi, '&'); // replace multiple consecutive ampersands with a single question mark
    if (url.indexOf('?') >= 0) {
        if (url.indexOf('&') < 0) url = `${url}&`;
        const queryString: string[] = url.split('?')[1].split('&');
        let keyValue: string[];
        queryString.forEach((paramAndValue) => {
            if (paramAndValue !== '') {
                if (paramAndValue.indexOf('=') >= 0) {
                    keyValue = paramAndValue.split('=');
                    if (keyValue[0].trim() !== '') {
                        query[keyValue[0]] = keyValue[1];
                    }
                } else {
                    query[paramAndValue] = true;
                }
            }
        });
    } else {
        return null;
    }
    return query;
}

function updateToken(token: string) {
    return window.localStorage.setItem('token', token);
}

export {setToken, getToken, extendSession, extendSlidingExpiration, getQuery, getPage, updateToken, signOut};

/**
 * Created by JJ on 16/7/20.
 */

export function jj_toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map((key) => {
        const val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map((val2) => (encodeURIComponent(key) + '=' + encodeURIComponent(val2))).join('&');
        }
        return (encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }).join('&') : '';
}

export function jj_httpPost(url, params, options = {}) {
    return fetch(url, Object.assign({
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: jj_toQueryString(params),
    }, options));
}

export function jj_httpGet(url, params, options = {}) {
    return fetch(url + (params ? `?${jj_toQueryString(params)}` : ''), Object.assign({
        method: 'GET',
        headers: {},
    }, options));
}

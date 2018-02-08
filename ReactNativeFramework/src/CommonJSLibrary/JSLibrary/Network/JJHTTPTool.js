/**
 * Created by JJ on 16/7/20.
 */

class JJHTTPTool
{
    static toQueryString(obj) {
        return obj ? Object.keys(obj).sort().map((key) => {
            const val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map((val2) => (`${encodeURIComponent(key)}=${encodeURIComponent(val2)}`)).join('&');
            }
            return (`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        })
            .join('&') : '';
    }

    static post(url, params, options = {}) {
        return fetch(url, Object.assign({
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JJHTTPTool.toQueryString(params),
        }, options));
    }

    static get(url, params, options = {}) {
        return fetch(url + (params ? `?${JJHTTPTool.toQueryString(params)}` : ''), Object.assign({
            method: 'GET',
            headers: {},
        }, options));
    }
}

export default JJHTTPTool;

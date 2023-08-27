//@ts-check
import Storage from '../StorageService';

const BASE_URL = "http://localhost:1337";

/**
 * @param {string} uri
 * @param {any=} body
 * @returns {Promise<any>}
 */
function sendPost(uri, body) {
    /** @type {RequestInit} */
    const opt = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    };
    return fetchJson(uri, opt);
}

/**
 * @param {string} uri
 * @returns {Promise<any>}
 */
function sendGet(uri) {
    /** @type {RequestInit} */
    const opt = {
        method: 'GET',
        headers: getHeaders()
    };
    return fetchJson(uri, opt);
}

/**
 * @param {string} uri
 * @param {RequestInit} opt
 * @returns {Promise<void> | Promise<any>}
 */
function fetchJson(uri, opt) {
    return fetch(BASE_URL + uri, opt)
        .then(resp => resp.text())
        .then(txt => {
            if (!txt || txt.length < 3) {
                return Promise.resolve();
            }
            let json = JSON.parse(txt);
            return Promise.resolve(json);
        })
}

/**
 * @returns {HeadersInit}
 */
function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    }
    const token = Storage.getToken();
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
}

const ApiTool = {
    sendPost,
    sendGet
}
export default ApiTool;
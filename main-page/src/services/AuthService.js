//@ts-check
import Storage from './StorageService';
import HooksManager from './HooksManager';
const BASE_URL = "http://localhost:1337";

/**
 * @typedef {object} TokenObject
 * @property {string} token
 */

/**
 * @typedef {object} User
 * @property {string} login
 * @property {string} name
 * @property {string[]} roles
 */

/**
 * @param {string} token
 */
function parseUser(token) {
    if (!token) {
        return null;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload).payload;
}

/**
 * @param {string} login
 * @param {string} password
 */
function login(login, password) {
    fetch(BASE_URL + '/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    })
        .then(resp => resp.json())
        .then(onNewToken);
}

/**
 * @param {TokenObject} tokenObject
 */
function onNewToken(tokenObject) {
    const { token } = tokenObject;
    Storage.saveToken(token);
    const user = parseUser(token);
    HooksManager.fire('user', user);
}

function logout() {
    const token = Storage.getToken();
    Storage.cleanToken();
    if (token) {
        fetch(BASE_URL + '/api/logout', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
    HooksManager.fire('user', null);
}

function getStrageUser() {
    const token = Storage.getToken();
    return token && parseUser(token);
}

export default {
    login,
    logout,
    getStrageUser,
}
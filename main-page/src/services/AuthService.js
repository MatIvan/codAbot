//@ts-check
import Storage from './StorageService';
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

/** @type User | null */
let currentUser = null;
let hooks = {
    setUser: null
}

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
    hookUser(null);
}

/**
 * @param {TokenObject} tokenObject
 */
function onNewToken(tokenObject) {
    const { token } = tokenObject;
    Storage.saveToken(token);
    const user = parseUser(token);
    hookUser(user);
}

/**
 * @param {User | null} newUser 
 */
function hookUser(newUser) {
    currentUser = newUser;
    if (!hooks.setUser) {
        console.warn('AuthService: no hook for User.');
        return;
    }
    // @ts-ignore
    hooks.setUser(newUser);
    hooks.setUser = null;
}

export default {
    currentUser,
    hooks,
    login,
    logout,
}
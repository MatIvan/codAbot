//@ts-check
import Storage from './StorageService';
import HooksManager from './HooksManager';
import AuthApi from './api/AuthApi';
import CryptoJs from 'crypto-js';
import Sha256 from 'crypto-js/sha256';

/**
 * @typedef {object} User
 * @property {string} login
 * @property {string} name
 * @property {string[]} roles
 */

/**
 * @typedef {import('./api/AuthApi').TokenObject} TokenObject
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
    const secPass = encode(login, password);
    AuthApi.login(login, secPass)
        .then(onNewToken)
        .catch((e) => {
            Storage.cleanToken();
            HooksManager.fire('user', null);
        });
}


/**
 * @param {string} login
 * @param {string} password
 * @returns {string}
 */
function encode(login, password) {
    return Sha256(login + ":" + password)
        .toString(CryptoJs.enc.Base64);
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
    AuthApi.logout();
    Storage.cleanToken();
    HooksManager.fire('user', null);
}

function getStorageUser() {
    const token = Storage.getToken();
    return token && parseUser(token);
}

const AuthService = {
    login,
    logout,
    getStorageUser,
}
export default AuthService;
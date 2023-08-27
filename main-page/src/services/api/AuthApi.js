//@ts-check
import ApiTool from './ApiTool';

/**
 * @typedef {object} TokenObject
 * @property {string} token
 */

/**
 * @param {string} login
 * @param {string} password
 * @returns {Promise<TokenObject>}
 */
function login(login, password) {
    return ApiTool.sendPost('/api/login', { login, password });
}

/**
 * @returns {Promise<void>}
 */
function logout() {
    return ApiTool.sendGet('/api/logout');
}

const AuthApi = {
    login,
    logout
}
export default AuthApi;

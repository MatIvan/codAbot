//@ts-check
///<reference path='../repository/Entities.js'/>

import DB from '../repository/DB.js'; '../repository/db';
import JWT from 'jsonwebtoken';
const { sign } = JWT;
import Logger from '../libs/log.js';
const log = Logger.getLogger('UserCredentialService');

/**
 * @typedef {object} UserCredential
 * @property {string} login
 * @property {string} password
 */

/**
 * @typedef {string} Login
 */
/**
 * @typedef {object} Token
 * @property {string} token
 */

/**
 * @typedef {object} TokenPayload
 * @property {Login} login
 * @property {string} name
 * @property {Role[]} roles
 */

/** @type {Map<Login, Token>} */
const usersOnline = new Map();

/**
 * @param {UserCredential} userCredential
 * @returns {Token} token
 */
function login(userCredential) {
    const userLogin = userCredential.login;
    const userPass = userCredential.password;
    if (!!usersOnline.get(userLogin)) {
        log.info('User allready login. Refresh.');
        usersOnline.delete(userLogin);
    };

    const userEntity = DB.users.getByLogin(userLogin);
    if (!userEntity) {
        throw new Error(`User not found: ` + userLogin);
    }

    if (userEntity.secret !== userPass) {
        throw new Error(`Access deny: ` + userLogin);
    }

    const token = {
        token: generateRawToken(userEntity)
    }
    usersOnline.set(userEntity.login, token);
    log.info('Login: ', userLogin);
    return token;
}

/**
 * @param {string} userLogin
 */
function logout(userLogin) {
    if (!userLogin) {
        return;
    }
    usersOnline.delete(userLogin);
    log.info('Logout: ', userLogin);
}

/**
 * @param {User} userEntity
 * @returns {string} tokenRaw
 */
function generateRawToken(userEntity) {
    /** @type {TokenPayload} */
    const payload = {
        login: userEntity.login,
        name: userEntity.name,
        roles: userEntity.roles
    }
    const signature = 'SuperAdminParol';
    const expiration = '6h';
    return sign({ payload, }, signature, { expiresIn: expiration });
}

export default {
    login,
    logout
}

//@ts-check
import { getUserByLogin } from '../repository/db.mjs';
import JWT from 'jsonwebtoken';
const { sign } = JWT;

/**
 * @typedef {import('../repository/db.mjs').Role} Role;
 * @typedef {import('../repository/db.mjs').UserEntity} UserEntity;
 */

/**
 * @typedef {object} UserCredential
 * @property {string} login
 * @property {string} password
 */

/**
 * @typedef {string} Login
 * @typedef {string} Token
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
        throw new Error('User allready online:' + userLogin);
    };

    const userEntity = getUserByLogin(userLogin);
    if (!userEntity) {
        throw new Error(`User not found: ` + userLogin);
    }

    if (userEntity.secret !== userPass) {
        throw new Error(`Access deny: ` + userLogin);
    }

    const token = generateToken(userEntity);
    usersOnline.set(userEntity.login, token);
    return token;
}

/**
 * @param {UserEntity} userEntity
 * @returns {Token} token
 */
function generateToken(userEntity) {
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

export {
    login
}

//@ts-check
import { getUserByLogin } from '../../repository/db.mjs';
import JWT from 'jsonwebtoken';
import { getLogger } from '../../libs/log.mjs';
const log = getLogger('AUTH');

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("express").RequestHandler} RequestHandler
 */

/**
 * @typedef {import("../../repository/db.mjs").Role} Role
 * @typedef {import("../../services/userService.mjs").Token} Token
 * @typedef {import("../../services/userService.mjs").TokenPayload} TokenPayload
 */

/**
 * @param {Request} req 
 * @returns {Token} token
 */
function getHeaderToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Authorization header require.');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
        throw new Error('Authorization header type require "Bearer".');
    }
    if (!token) {
        throw new Error('Authorization header token is empty.');
    }
    return token;
}

/**
 * @param {Request} req 
 * @param {Role} role
 * @returns 
 */
function auth(req, role) {
    const authSecret = getHeaderToken(req);
    const payloadRaw = JWT.verify(authSecret, 'SuperAdminParol');
    /** @type {TokenPayload} */
    const payload = JSON.parse(payloadRaw);
    const user = getUserByLogin(payload.login);
    if (!user) {
        throw new Error('User not found: ' + payload.login);
    }
    if (user.roles.indexOf(role) < 0) {
        throw new Error('Access deny by role');
    }
    req['user'] = user;
}

function tryAuth(req, res, next, role) {
    try {
        auth(req, role);
        next();
    } catch (e) {
        log.error('AuthFilter: ', e);
        res.status(401).end(e);
        return;
    }
}

export {
    authFilter,
    adminFilter,
}

/**
 * @type {RequestHandler}
 */
function authFilter(req, res, next) {
    tryAuth(req, res, next, 'user');
}

/**
 * @type {RequestHandler}
 */
function adminFilter(req, res, next) {
    tryAuth(req, res, next, 'admin');
}

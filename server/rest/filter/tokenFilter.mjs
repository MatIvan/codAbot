//@ts-check
///<reference path='../../repository/Entities.js'/>

import DB from '../../repository/DB';
import JWT from 'jsonwebtoken';
import Logger from '../../libs/log.js';
const log = Logger.getLogger('AUTH');

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("express").RequestHandler} RequestHandler
 */

/**
 * @typedef {import("../../services/UserCredentialService.mjs").Token} Token
 * @typedef {import("../../services/UserCredentialService.mjs").TokenPayload} TokenPayload
 */

/**
 * @param {Request} req 
 * @returns {string} token
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
    const user = getUserByToken(req, true);
    if (!user) {
        throw new Error('User not found');
    }
    if (user.roles.indexOf(role) < 0) {
        throw new Error('Access deny by role');
    }
    req['user'] = user;
}

/**
 * @param {Request} req
 * @param {boolean} require
 */
function getUserByToken(req, require) {
    try {
        const authSecret = getHeaderToken(req);
        const payloadRaw = JWT.verify(authSecret, 'SuperAdminParol');
        // @ts-ignore
        const payload = payloadRaw.payload;
        return DB.users.getByLogin(payload.login);
    } catch (e) {
        if (require) {
            log.error('getUserByToken:', e);
            throw e;
        }
    }
    return null;
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
    gameFilter,
    adminFilter,
    authFilter,
}

/**
 * @type {RequestHandler}
 */
function gameFilter(req, res, next) {
    log.debug('gameFilter');
    tryAuth(req, res, next, 'user');
}

/**
 * @type {RequestHandler}
 */
function adminFilter(req, res, next) {
    log.debug('adminFilter');
    tryAuth(req, res, next, 'admin');
}

/**
 * @type {RequestHandler}
 */
function authFilter(req, res, next) {
    log.debug('authFilter');
    const user = getUserByToken(req, false);
    req['user'] = user;
    next();
}
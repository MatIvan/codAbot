//@ts-check
///<reference path='../../repository/Entities.js'/>

import { RestError } from '../RestError.js'
import DB from '../../repository/DB.js';
import JWT from 'jsonwebtoken';
import Logger from '../../libs/log.js';
const log = Logger.getLogger('TokenFilter');

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").RequestHandler} RequestHandler
 */

/**
 * @type {RequestHandler}
 */
function parseAuthUser(req, res, next) {
    log.debug('parseAuthUserFilter');
    req['user'] = getUserByToken(req);
    next();
}

/**
 * @param {Request} req
 */
function getUserByToken(req) {
    const authSecret = getHeaderToken(req);
    if (!authSecret) {
        return null;
    }
    const login = parseLogin(authSecret);
    return DB.users.getByLogin(login);
}

/**
 * @param {Request} req 
 * @returns {string | null} token
 */
function getHeaderToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
        throw new RestError('Authorization header type require "Bearer".', 401);
    }
    if (!token) {
        throw new RestError('Authorization header token is empty.', 401);
    }
    return token;
}

function parseLogin(authSecret) {
    try {
        const payloadRaw = JWT.verify(authSecret, 'SuperAdminParol');
        // @ts-ignore
        return payloadRaw.payload.login;
    } catch (err) {
        console.log(err);
        throw new RestError('Authorization token parse error.', 401);
    }
}

const TokenFilter = {
    parseAuthUser,
}
export default TokenFilter;

//@ts-check
import { RestError } from '../RestError.js'
import Logger from '../../libs/log.js';
const log = Logger.getLogger('UserFilter');

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").RequestHandler} RequestHandler
 */


/**
 * @type {RequestHandler}
 */
function needRoleUserOrAdmin(req, res, next) {
    log.debug('needRoleUserAndAdmin');
    try {
        requireRole(req, 'user');
    } catch {
        requireRole(req, 'admin');
    }
    next();
}

/**
 * @type {RequestHandler}
 */
function needRoleAdmin(req, res, next) {
    log.debug('needRoleAdminFilter');
    requireRole(req, 'admin');
    next();
}

/**
 * @param {Request} req
 * @param {Role} role
 */
function requireRole(req, role) {
    const user = requireUser(req);
    if (user.roles.indexOf(role) < 0) {
        throw new RestError('Access deny by role.', 401);
    }
}

/**
 * @param {Request} req
 * @returns {User}
 */
function requireUser(req) {
    const user = req['user'];
    if (!user) {
        throw new RestError('Authorization require.', 401);
    }
    return user;
}

/**
 * @type {RequestHandler}
 */
function needActiveUser(req, res, next) {
    log.debug('needActiveUser');
    const user = requireUser(req);
    //TODO is user active
    next();
}
const UserFilter = {
    needRoleUserOrAdmin,
    needRoleAdmin,
    needActiveUser,
}
export default UserFilter;

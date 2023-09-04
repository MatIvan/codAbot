//@ts-check
import Logger from '../../libs/log.js';

const log = Logger.getLogger({
    loggerName: 'ACCESS',
    fileName: 'access.log',
    needConlose: true,
    level: 'debug'
});

/**
 * @typedef {import("express").RequestHandler} RequestHandler
 */

/**
 * @type {RequestHandler}
 */
function loggerFilter(req, res, next) {
    log.debug(req.method, req.url);
    next();
}

export {
    loggerFilter,
}

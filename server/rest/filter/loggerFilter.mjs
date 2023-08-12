//@ts-check
import { getLogger } from '../../libs/log.mjs';

const log = getLogger({
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

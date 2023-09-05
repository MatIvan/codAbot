//@ts-check

export class RestError extends Error {
    constructor(message = "", code = 500) {
        super(message);
        this.code = code;
    }
}

/**
 * @typedef {import("express").ErrorRequestHandler} ErrorRequestHandler
 */

/**
 * @type {ErrorRequestHandler}
 */
export function restErrorHandler(err, req, res, next) {
    if (err instanceof RestError) {
        res.status(err.code).end(err.message);
        return;
    }
    console.error(err);
    const msg = (typeof err?.message === 'string') ? err.message : 'Server error.';
    res.status(500).end(msg);
}
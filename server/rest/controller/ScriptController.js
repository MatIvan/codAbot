//@ts-check

import asyncHandler from "express-async-handler";
import db from "../../repository/DB.js";
import { RestError } from "../RestError.js";

/**
 * @typedef {import("express").Request} Request
 */

/**
 * @param {Request} req
 * @returns {User}
 */
function requireUser(req) {
    const user = req['user'];
    if (!user) {
        throw new Error('Auth user required.')
    }
    return user;
}

/**
 * @param {Script | undefined} entity 
 * @returns {ScriptInfo}
 */
function toInfo(entity) {
    if (!entity) {
        throw new RestError('Script not found.', 404);
    }
    const { id, name } = entity;
    return { id, name };
}

export const getAll = asyncHandler(async (req, res, next) => {
    const user = requireUser(req);
    const scripts = db.scripts.getByUser(user.id);
    res.json(scripts.map(toInfo));
});

export const getById = asyncHandler(async (req, res, next) => {
    const user = requireUser(req);
    const scriptId = Number.parseInt(req.params.id);
    const script = db.scripts.getById(scriptId);
    if (!script) {
        throw new RestError('Script id ' + scriptId + ' not found.', 404);
    }
    if (script.userId !== user.id) {
        throw new RestError('Script id ' + scriptId + ' has other owner.', 404);
    }
    res.json(script);
});

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
 * @param {Bot | undefined} entity 
 * @returns {BotInfo}
 */
function toInfo(entity) {
    if (!entity) {
        throw new RestError('Bot not found.', 404);
    }
    const { id, name } = entity;
    return { id, name };
}

export const getAll = asyncHandler(async (req, res, next) => {
    const user = requireUser(req);
    const scripts = db.bots.getByUser(user.id);
    res.json(scripts.map(toInfo));
});

export const getById = asyncHandler(async (req, res, next) => {
    const user = requireUser(req);
    const botId = Number.parseInt(req.params.id);
    const bot = db.scripts.getById(botId);
    if (!bot) {
        throw new RestError('Bot id ' + botId + ' not found.', 404);
    }
    if (bot.userId !== user.id) {
        throw new RestError('Bot id ' + botId + ' has other owner.', 404);
    }
    res.json(bot);
});

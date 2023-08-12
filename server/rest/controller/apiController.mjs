//@ts-check
import UserService from '../../services/userService.mjs'
import asyncHandler from "express-async-handler";
import { getLogger } from '../../libs/log.mjs';
const log = getLogger('API');

/**
 * @typedef {import('../../services/userService.mjs').UserEntity } UserEntity
 */

export const login = asyncHandler(async (req, res, next) => {
    let token;
    try {
        token = UserService.login(req.body);
    } catch (e) {
        log.error('Auth error: ', e.message);
        res.status(401).end('Access deny.');
        return;
    }
    res.send(token);
});

export const logout = asyncHandler(async (req, res, next) => {
    /** @type {UserEntity} */
    const user = req['user'];
    UserService.logout(user?.login);
    res.status(user ? 200 : 404).end();
});

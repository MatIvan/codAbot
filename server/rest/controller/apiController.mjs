//@ts-check
import { login as authLogin } from '../../services/userService.mjs'
import asyncHandler from "express-async-handler";
import { getLogger } from '../../libs/log.mjs';
const log = getLogger('API');

export const login = asyncHandler(async (req, res, next) => {
    let token;
    try {
        token = authLogin(req.body);
    } catch (e) {
        log.error('Auth error: ', e.message);
        res.status(401).end('Access deny.');
        return;
    }
    res.send(token);
});

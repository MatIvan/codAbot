//@ts-check
///<reference path='../../repository/Entities.js'/>

import UserCredentialService from '../../services/UserCredentialService.mjs'
import asyncHandler from "express-async-handler";
import Logger from '../../libs/log.js';
const log = Logger.getLogger('API');

export const login = asyncHandler(async (req, res, next) => {
    let token;
    try {
        token = UserCredentialService.login(req.body);
    } catch (e) {
        log.error('Auth error: ', e.message);
        res.status(401).end('Access deny.');
        return;
    }
    res.send(token);
});

export const logout = asyncHandler(async (req, res, next) => {
    /** @type {User} */
    const user = req['user'];
    UserCredentialService.logout(user?.login);
    res.status(user ? 200 : 404).end();
});

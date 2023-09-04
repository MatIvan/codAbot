//@ts-check
import asyncHandler from "express-async-handler";
import Game from '../../game/game.js';

export const index = asyncHandler(async (req, res, next) => {
    res.json("NOT IMPLEMENTED: Site Home Page");
});

export const start = asyncHandler(async (req, res, next) => {
    try {
        Game.start();
        res.json('game started.');
    } catch (e) {
        res.status(400).json(e.message).end();
    }
});

export const stop = asyncHandler(async (req, res, next) => {
    Game.stop();
    res.json('game stoped.');
});

export const status = asyncHandler(async (req, res, next) => {
    res.json(Game.status());
});

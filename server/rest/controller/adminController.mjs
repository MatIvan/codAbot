//@ts-check
import asyncHandler from "express-async-handler";
import Game from '../../game/game.mjs';

export const index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});

export const start = asyncHandler(async (req, res, next) => {
    Game.start();
    res.send('game started.');
});

export const stop = asyncHandler(async (req, res, next) => {
    Game.stop();
    res.json('game stoped.');
});

export const status = asyncHandler(async (req, res, next) => {
    res.json(Game.status());
});

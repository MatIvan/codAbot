//@ts-check
import asyncHandler from "express-async-handler";
import Game from '../../game/game.mjs';

export const status = asyncHandler(async (req, res, next) => {
    res.json(Game.status());
});

export const world = asyncHandler(async (req, res, next) => {
    res.json(Game.getWorld());
});

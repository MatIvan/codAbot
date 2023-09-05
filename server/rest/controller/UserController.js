//@ts-check
import asyncHandler from "express-async-handler";
import db from "../../repository/DB.js";

export const getAll = asyncHandler(async (req, res, next) => {
    res.json(db.users.getAll());
});

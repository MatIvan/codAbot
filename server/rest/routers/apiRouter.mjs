//@ts-check

import { Router } from "express";
const router = Router();

import { login, logout } from "../controller/apiController.mjs";

router.post("/login", login);
router.get("/logout", logout);

export default router;

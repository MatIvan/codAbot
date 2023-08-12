//@ts-check

import { Router } from "express";
const router = Router();

import { login } from "../controller/apiController.mjs";

router.post("/login", login);

export default router;

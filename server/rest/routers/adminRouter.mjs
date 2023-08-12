//@ts-check

import { Router } from "express";
const router = Router();

import { start, stop, status } from "../controller/adminController.mjs";

router.post("/start", start);
router.post("/stop", stop);
router.post("/status", status);

export default router;

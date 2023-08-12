//@ts-check
import { Router } from "express";
const router = Router();

import { status, world } from "../controller/gameController.mjs";

router.post("/status", status);
router.post("/world", world);

export default router;

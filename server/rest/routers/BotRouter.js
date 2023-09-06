//@ts-check
import { Router } from "express";
const router = Router();

import { getAll, getById } from "../controller/BotController.js";

router.get("/", getAll);
router.get("/:id", getById);

export default router;

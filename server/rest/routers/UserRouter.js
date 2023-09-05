//@ts-check
import { Router } from "express";
const router = Router();

import { getAll } from "../controller/UserController.js";

router.get("/", getAll);

export default router;

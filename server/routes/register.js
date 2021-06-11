import express from "express";
import { createRegister, getRegisters } from "../controllers/register.js";
import { ensureAuth } from "../middlewares/authenticated.js";

const router = express.Router();

router.post('/create-register', [ensureAuth], createRegister);
router.get('/get-registers', [ensureAuth], getRegisters);

export default router;
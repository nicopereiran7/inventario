import express from "express";
import { createCategory, getCategories } from "../controllers/category.js";
import { ensureAuth } from "../middlewares/authenticated.js";

const router = express.Router();

router.post('/create-category', [ensureAuth], createCategory);
router.get('/get-categories', getCategories);

export default router;
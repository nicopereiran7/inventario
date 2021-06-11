import express from "express";
import { signUp, signIn, getUsers, createProduct } from "../controllers/user.js";
import { ensureAuth } from "../middlewares/authenticated.js";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/get-users', [ensureAuth], getUsers);
router.post('/create-product', [ensureAuth], createProduct);

export default router;

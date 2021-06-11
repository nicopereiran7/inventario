import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct, lastProduct } from "../controllers/product.js";
import { ensureAuth } from "../middlewares/authenticated.js";

const router = express.Router();

router.post('/create-product', [ensureAuth], createProduct);
router.get('/get-products', [ensureAuth], getProducts);
router.put('/update-product/:id', [ensureAuth], updateProduct);
router.delete('/delete-product/:id', [ensureAuth], deleteProduct);
router.get('/last-product', [ensureAuth], lastProduct);

export default router;

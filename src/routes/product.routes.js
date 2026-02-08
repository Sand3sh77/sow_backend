import express from "express";
import { validateProduct } from "#validations/product.validation.js";
import { getProducts, createProduct } from "#controllers/product.controller.js";
import { verifyToken } from "#middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.post("/", verifyToken, validateProduct, createProduct);

export default router;

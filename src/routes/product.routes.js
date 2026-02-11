import express from "express";
import { validateEditProduct, validateProduct } from "#validations/product.validation.js";
import { getProducts, createProduct, editProduct } from "#controllers/product.controller.js";
import { verifyToken } from "#middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.post("/", verifyToken, validateProduct, createProduct);
router.patch("/:id", verifyToken, validateEditProduct, editProduct);

export default router;

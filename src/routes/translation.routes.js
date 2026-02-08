import express from "express";
import { addOrUpdateTranslation, getTranslations } from "#controllers/translation.controller.js";
import { validateTranslation } from "#validations/translation.validation.js";
import { verifyToken } from "#middleware/auth.middleware.js";

const router = express.Router();

router.get("/:lang", getTranslations);
router.post("/", verifyToken, validateTranslation, addOrUpdateTranslation);

export default router;

import express from "express";
import { addOrUpdateTranslation, getTranslations } from "#controllers/translation.controller.js";
import { validateTranslation } from "#validations/translation.validation.js";

const router = express.Router();

router.post("/", validateTranslation, addOrUpdateTranslation);
router.get("/:lang", getTranslations);

export default router;

import express from "express";
import { addLanguage, getConfig } from "#controllers/config.controller.js";
import { validateLanguage } from "#validations/config.validation.js";
import { verifyToken } from "#middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getConfig);
router.post("/languages", verifyToken, validateLanguage, addLanguage);

export default router;

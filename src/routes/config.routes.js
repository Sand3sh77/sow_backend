import express from "express";
import { addLanguage, getLanguages } from "#controllers/config.controller.js";
import { validateLanguage } from "#validations/config.validation.js";

const router = express.Router();

router.get("/languages", getLanguages);
router.post("/languages", validateLanguage, addLanguage);

export default router;

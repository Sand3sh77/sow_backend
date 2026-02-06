import express from "express";
import { login, signup } from "#controllers/auth.controller.js";
import { validateUser } from "#validations/auth.validation.js";

const router = express.Router();

router.post("/signup", validateUser, signup);

router.post("/login", validateUser, login)

router.post("/logout", (req, res) => {
    res.send("POST /logout response");
});

export default router;

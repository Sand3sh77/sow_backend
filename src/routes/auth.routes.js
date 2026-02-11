import express from 'express';
import { login, signup } from '#controllers/auth.controller.js';
import {
  validateUserLogin,
  validateUserSignUp,
} from '#validations/auth.validation.js';

const router = express.Router();

router.post('/signup', validateUserSignUp, signup);

router.post('/login', validateUserLogin, login);

router.post('/logout', (req, res) => {
  res.send('POST /logout response');
});

export default router;

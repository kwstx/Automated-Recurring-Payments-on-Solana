import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validator } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validator.register, register);
router.post('/login', validator.login, login);

export default router;

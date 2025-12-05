import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validate } from '../middleware/validation.js';
import { registerSchema, loginSchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;

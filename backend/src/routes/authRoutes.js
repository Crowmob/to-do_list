import express from 'express';
import authController from "../controllers/authController.js"
import { validateBody } from "../validators/validate.js";
import { userSchema } from "../validators/userValidator.js";
import authHandler from '../middlewares/authHandler.js';

const router = express.Router();

router.get('/me', authController.getMe);

router.post('/login', validateBody(userSchema), authController.login);

router.post('/register', validateBody(userSchema), authController.register);

router.post('/logout', authController.logout);

export default router;
import express from 'express';
import authController from "../controllers/authController.js"
import { validateBody } from "../validators/validate.js";
import { userSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post('/login', validateBody(userSchema), authController.login);

router.post('/register', validateBody(userSchema), authController.register);

router.post('/logout', authController.logout);

export default router;
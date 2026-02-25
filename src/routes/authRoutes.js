import express from 'express';
import authController from "../controllers/authController.js"

const router = express.Router();

router.post('/login/:id', authController.login);

router.post('/register', authController.register);

router.post('/logout', authController.logout);

export default router;
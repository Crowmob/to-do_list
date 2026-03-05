import express from 'express';
import taskController from '../controllers/taskController.js';
import authHandler from '../middlewares/authHandler.js';
import { taskSchema } from '../validators/taskValidator.js';
import { idSchema } from '../validators/baseValidator.js'
import { validateBody, validateParams } from '../validators/validate.js';

const router = express.Router();

router.use(authHandler);

router.get('/', taskController.getAllTasks);

router.get('/:id', validateParams(idSchema), taskController.getTaskById);

router.post('/', validateBody(taskSchema), taskController.createTask);

router.put('/:id', validateParams(idSchema), validateBody(taskSchema), taskController.updateTask);

router.delete('/:id', validateParams(idSchema), taskController.deleteTask);

export default router;
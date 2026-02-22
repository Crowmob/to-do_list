import express from 'express';
import taskController from '../controllers/taskController.js';
import logger from '../utils/logger.js';
import { taskSchema, taskIdSchema } from '../validators/taskValidator.js';
import { validateBody, validateParams } from '../validators/validate.js';

const router = express.Router();

router.get('/', taskController.getAllTasks);

router.get('/:id', validateParams(taskIdSchema), taskController.getTaskById);

router.post('/', validateBody(taskSchema), taskController.createTask);

router.put('/:id', validateParams(taskIdSchema), validateBody(taskSchema), taskController.updateTask);

router.delete('/:id', validateParams(taskIdSchema), taskController.deleteTask);

export default router;
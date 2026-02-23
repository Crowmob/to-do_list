import { ConflictError, DatabaseError, NotFoundError } from '../errors/appErrors.js';
import taskRepository from '../repositories/taskRepository.js';
import logger from '../utils/logger.js';

const getAllTasks = async () => {
    const tasks = await taskRepository.getAllTasks();
    logger.info(`Retrieved ${tasks.length} tasks`);
    return tasks;
};

const getTaskById = async (id) => {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
        throw new NotFoundError(`Task with ID: ${id} not found`);
    }

    logger.info(`Task with ID: ${id} accessed`);
    return task;
};

const createTask = async (taskData) => {
    const task = await taskRepository.createTask(taskData);
  
    if (!task) {
        throw new ConflictError("Failed to create task");
    }
  
    logger.info(`Task created with name: ${task.name}`);
    return task;
};

const updateTask = async (id, taskData) => {
    await getTaskById(id); 

    const updatedTask = await taskRepository.updateTask(id, taskData);

    logger.info(`Task updated with ID: ${id}`);
    return updatedTask;
};

const deleteTask = async (id) => {
    await getTaskById(id);
  
    await taskRepository.deleteTask(id);
    logger.info(`Task deleted with ID: ${id}`);
};

export default {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
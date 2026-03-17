import { ConflictError, DatabaseError, NotFoundError } from '../errors/appErrors.js';
import taskRepository from '../repositories/postgres/taskRepository.js';
import logger from '../utils/logger.js';

const getAllTasks = async (userId) => {
    try {
        const tasks = await taskRepository.getAllTasks(userId);
        logger.info(`Retrieved ${tasks.length} tasks`);
        return tasks;
    } catch (err) {
        throw new DatabaseError("Failed to fetch tasks", err);
    }
};

const getTaskById = async (id, userId) => {
    try {
        const task = await taskRepository.getTaskById(id, userId);
        if (!task) {
            throw new NotFoundError(`Task with ID: ${id} not found`);
        }
        logger.info(`Task with ID: ${id} accessed`);
        return task;
    } catch (err) {
        if (err instanceof NotFoundError) throw err;
        throw new DatabaseError("Failed to fetch task", err);
    }
};

const createTask = async (taskData) => {
    try {
        const task = await taskRepository.createTask(taskData);
    
        if (!task) {
            throw new ConflictError("Failed to create task");
        }
    
        logger.info(`Task created with name: ${task.name}`);
        return task;
    } catch (err) {
        if (err instanceof ConflictError) throw err;
        throw new DatabaseError("Failed to create task", err);
    }
};

const updateTask = async (id, taskData, userId, completed) => {
    try {
        await getTaskById(id, userId);
        const updatedTask = await taskRepository.updateTask(id, taskData, userId);
        logger.info(`Task updated with ID: ${id}`);
        return updatedTask;
    } catch (err) {
        if (err instanceof NotFoundError) throw err;
        throw new DatabaseError("Failed to update task", err);
    }
};

const deleteTask = async (id, userId) => {
    try {
        await getTaskById(id, userId);
    
        await taskRepository.deleteTask(id, userId);
        logger.info(`Task deleted with ID: ${id}`);
    } catch (err) {
        if (err instanceof NotFoundError) throw err;
        throw new DatabaseError("Failed to delete task", err);
    }
};

export default {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
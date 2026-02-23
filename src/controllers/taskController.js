import taskService from '../services/taskService.js';
import logger from '../utils/logger.js';

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        logger.info("Tasks endpoint accessed");
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);       
        const task = await taskService.getTaskById(id);
        res.json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const task = await taskService.updateTask(id, { name: req.body.name, priority: req.body.priority });
        res.json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await taskService.deleteTask(id);
        res.status(204).send(`Task deleted with ID: ${id}`);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask }
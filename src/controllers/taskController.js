import taskService from '../services/taskServices.js';
import logger from '../utils/logger.js';
import { verifyToken } from '../utils/jwt.js';

const getAllTasks = async (req, res) => {
    try {
        const data = await verifyToken(req.cookies["accessToken"]);
        const tasks = await taskService.getAllTasks(data.userId);
        logger.info("Tasks endpoint accessed");
        res.json(tasks);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await verifyToken(req.cookies["accessToken"]);       
        const task = await taskService.getTaskById(id, data.userId);
        res.json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const data = await verifyToken(req.cookies["accessToken"]);
        const task = await taskService.createTask({ ...req.body, userId: data.userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await verifyToken(req.cookies["accessToken"]);
        const task = await taskService.updateTask(id, { name: req.body.name, priority: req.body.priority }, data.userId);
        res.json(task);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await verifyToken(req.cookies["accessToken"]);
        await taskService.deleteTask(id, data.userId);
        res.status(204).send(`Task deleted with ID: ${id}`);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask }
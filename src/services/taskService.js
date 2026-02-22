import express from 'express';
import taskRepository from '../repositories/taskRepository.js';
import logger from '../utils/logger.js';

const getAllTasks = async () => {
    try {
        const tasks = await taskRepository.getAllTasks();
        return tasks;
    } catch (error) {
        throw error;
    }
}

const getTaskById = async (id) => {
    try {
        const task = await taskRepository.getTaskById(id);
        logger.info(`Task with ID: ${id} accessed`);
        return task;
    } catch (error) {
        throw error;
    }
}

const createTask = async (taskData) => {
    try {
        const task = await taskRepository.createTask(taskData);
        logger.info(`Task created with name: ${task.name}`);
        return task;
    } catch (error) {
        throw error;
    }
}

const updateTask = async (id, taskData) => {
    try {
        const task = await taskRepository.updateTask(id, taskData);
        logger.info(`Task updated with ID: ${id}`);
        return task;
    } catch (error) {
        throw error;
    }
}

const deleteTask = async (id) => {
    try {
        const task = await taskRepository.deleteTask(id);
        logger.info(`Task deleted with ID: ${id}`);
    } catch (error) {
        throw error;
    }
}

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask }
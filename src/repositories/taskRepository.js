import prisma from '../prismaClient.js';
import { DatabaseError } from '../errors/appErrors.js';

const getAllTasks = async () => {
    return await prisma.task.findMany();
};

const getTaskById = async (id) => {
    return await prisma.task.findUnique({ where: { id } });
};

const createTask = async (taskData) => {
    return await prisma.task.create({ data: taskData });
};

const updateTask = async (id, taskData) => {
    return await prisma.task.update({
      where: { id },
      data: taskData
    });
};

const deleteTask = async (id) => {
    return await prisma.task.delete({ where: { id } });
};

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask };
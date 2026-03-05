import prisma from '../../prismaClient.js';

const getAllTasks = async (userId) => {
    return await prisma.task.findMany({ where: { userId } });
};

const getTaskById = async (id, userId) => {
    return await prisma.task.findUnique({ where: { id, userId } });
};

const createTask = async (taskData) => {
    return await prisma.task.create({ data: taskData });
};

const updateTask = async (id, taskData, userId) => {
    return await prisma.task.update({
      where: { id, userId },
      data: taskData
    });
};

const deleteTask = async (id, userId) => {
    return await prisma.task.delete({ where: { id, userId } });
};

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask };
import prisma from '../prismaClient.js';

export const getAllTasks = async () => {
    return await prisma.task.findMany();
}
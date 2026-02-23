import prisma from '../prismaClient.js';
import { DatabaseError } from '../errors/appErrors.js';

const getAllTasks = async () => {
  try {
    return await prisma.task.findMany();
  } catch (err) {
    throw new DatabaseError("Failed to fetch tasks", err);
  }
};

const getTaskById = async (id) => {
  try {
    return await prisma.task.findUnique({ where: { id } });
  } catch (err) {
    throw new DatabaseError("Failed to fetch task", err);
  }
};

const createTask = async (taskData) => {
  try {
    return await prisma.task.create({ data: taskData });
  } catch (err) {
    throw new DatabaseError("Failed to create task", err);
  }
};

const updateTask = async (id, taskData) => {
  try {
    return await prisma.task.update({
      where: { id },
      data: taskData
    });
  } catch (err) {
    throw new DatabaseError("Failed to update task", err);
  }
};

const deleteTask = async (id) => {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (err) {
    throw new DatabaseError("Failed to delete task", err);
  }
};

export default { getAllTasks, createTask, getTaskById, updateTask, deleteTask };
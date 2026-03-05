import logger from "../utils/logger.js";
import userRepository from "../repositories/postgres/userRepository.js";
import { ConflictError, DatabaseError, NotFoundError } from "../errors/appErrors.js";
import { Prisma } from "@prisma/client";

const getUserById = async (userId) => {
    try {
        const userData = await userRepository.getUserById(userId);
        if (!userData) {
            throw new NotFoundError(`User with ID: ${userId} not found`);
        }
        logger.info(`User with ID: ${userId} accessed`);
        return userData;
    } catch (err) {
        if (err instanceof NotFoundError) throw err;
        throw new DatabaseError("Failed to fetch user", err);
    }
};

const getUserByUsername = async (username) => {
    try {
        const userData = await userRepository.getUserByUsername(username);
        if (!userData) {
            throw new NotFoundError(`User with username: ${username} not found`);
        }
        logger.info(`User with username: ${username} accessed`);
        return userData;
    } catch (err) {
        if (err instanceof NotFoundError) throw err;
        throw new DatabaseError("Failed to fetch user", err);
    }
};

const createUser = async (userData) => {
    try {
        const user = await userRepository.createUser(userData);
        logger.info(`User created with id: ${user.id}`);
        return user;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            throw new ConflictError("User already exists");
        }
        throw new DatabaseError("Failed to create user", err);
    }
};

export default {
    createUser,
    getUserById,
    getUserByUsername
}
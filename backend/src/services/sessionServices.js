import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from "../errors/appErrors.js";
import sessionPostgresRepository from "../repositories/postgres/sessionRepository.js"
import sessionRedisRepository from "../repositories/redis/sessionRepository.js"
import { Prisma } from "@prisma/client";

const createSessionInPostrgres = async (userId, createdAt, expiredAt) => {
    try {
        await sessionPostgresRepository.createSession(userId, createdAt, expiredAt);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
            throw new ValidationError('Session already exists for this user.', error);
        throw new DatabaseError('Failed to create session', error);
    }
}

const createSessionInRedis = async (userId, sessionData) => {
    try {
        await sessionRedisRepository.createSession(userId, sessionData);
    } catch (error) {
        throw new DatabaseError('Failed to create session', error);
    }
}

const getCurrentSession = async (userId) => {
    try {
        const session = await sessionRedisRepository.getSession(userId);
        if (Date.now() > session.refreshTime || Date.now() > session.expiredAt) {
            throw new UnauthorizedError('Session has expired. Please log in again.');
        }
        if (!session) {
            throw new UnauthorizedError('No active session found for this user.');
        }
        return session;
    } catch (error) {
        throw new UnauthorizedError('Failed to get session', error);
    }
}

const deleteSession = async (userId) => {
    try {
        const session = await sessionRedisRepository.getSession(userId);
        if (session) 
            await sessionRedisRepository.deleteSession(userId);
    } catch (error) {
        throw new DatabaseError('Failed to delete session', error);
    }
}

export default {
    createSessionInPostrgres,
    createSessionInRedis,
    getCurrentSession,
    deleteSession
}
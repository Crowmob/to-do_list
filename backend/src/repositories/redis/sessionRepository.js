import redis from "../../redisClient.js";

const createSession = async (userId, sessionData) => {
    await redis.set(`session:${userId}`, JSON.stringify(sessionData), {
        EX: sessionData.expireTime
    });
}

const getSession = async (userId) => {
    const session = await redis.get(`session:${userId}`);
    return session ? JSON.parse(session) : null;
}

const deleteSession = async (userId) => {
    await redis.del(`session:${userId}`);
}

export default {
    createSession,
    getSession,
    deleteSession
}
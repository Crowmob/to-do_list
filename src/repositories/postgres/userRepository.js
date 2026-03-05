import prisma from "../../prismaClient.js";

const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData
    })
}

const getUserById = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId }
    })
}

const getUserByUsername = async (username) => {
    return await prisma.user.findUnique({
        where: { username }
    })
}

export default {
    createUser,
    getUserById,
    getUserByUsername
}
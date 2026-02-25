import prisma from "../prismaClient.js";

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

export default {
    createUser,
    getUserById
}
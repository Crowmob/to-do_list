import prisma from '../../prismaClient.js';

const createSession = async (userId, createdAt, expiredAt) => {
  await prisma.session.create({
    data: {
      userId,
      createdAt,
      expiredAt,
    },
  });
};

export default { createSession };
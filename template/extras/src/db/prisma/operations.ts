import { prisma } from '.';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return users;
};

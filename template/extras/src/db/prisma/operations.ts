import { prisma } from ".";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

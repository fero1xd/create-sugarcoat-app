import { prisma } from '.';
import { type Prisma } from '@prisma/client';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

import { db } from ".";

export const getAllUsers = async () => {
  const users = await db.query.users.findMany();
  return users;
};

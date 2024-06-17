import { db } from '.';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
  const users = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
    },
  });
  return users;
};

export const createUser = async (data: typeof users.$inferInsert) =>
  (await db.insert(users).values(data).returning())[0];

export const getUser = (email: string) =>
  db.query.users.findFirst({ where: eq(users.email, email) });

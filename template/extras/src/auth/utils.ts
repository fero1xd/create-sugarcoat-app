import { lucia } from '.';

export const createSessionAndCookie = async (id: number, name: string) => {
  const session = await lucia.createSession(id, {
    name,
  });

  const cookie = lucia.createSessionCookie(session.id);

  return cookie;
};

import { lucia } from '.';

export const createSessionAndCookie = async (id: number) => {
  const session = await lucia.createSession(id, {});

  const cookie = lucia.createSessionCookie(session.id);

  return cookie;
};

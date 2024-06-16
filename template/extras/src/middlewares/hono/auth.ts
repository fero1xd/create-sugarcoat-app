import { getCookie } from 'hono/cookie';
import { lucia } from '../auth';

export const authMiddleware = async (c, next) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);

    return c.json({
      message: 'Unauthorized',
    });
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    // use `header()` instead of `setCookie()` to avoid TS errors
    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });

    return c.json({
      message: 'Unauthorized',
    });
  }
  c.set('user', user);
  c.set('session', session);

  return next();
};

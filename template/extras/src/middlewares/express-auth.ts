import { lucia } from '../auth';
import { type RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  if (!sessionId) {
    return res.json({
      message: 'Unauthorized',
    });
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    res.appendHeader(
      'Set-Cookie',
      lucia.createSessionCookie(session.id).serialize()
    );
  }

  if (!session) {
    res.appendHeader(
      'Set-Cookie',
      lucia.createBlankSessionCookie().serialize()
    );

    return res.json({
      message: 'Unauthorized',
    });
  }

  res.locals.user = user;

  return next();
};

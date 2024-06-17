import { Hono } from 'hono';
import { createUser, getUser } from '../db/operations';
import { Argon2id } from 'oslo/password';
import { createSessionAndCookie } from '../auth/utils';
import { setCookie } from 'hono/cookie';
import { authMiddleware } from '../middlewares/auth';
import type { User } from 'lucia';

export const createAuthRoutes = () => {
  const hono = new Hono<{
    Variables: {
      user: User | null;
    };
  }>();

  hono.post('/register', async (c) => {
    const { name, email, age, password } = await c.req.json();

    const hashedPassword = await new Argon2id().hash(password);
    const user = await createUser({
      name,
      email,
      age,
      password: hashedPassword,
    });

    return c.json({
      user,
    });
  });

  hono.post('/login', async (c) => {
    const { email, password } = await c.req.json();

    const user = await getUser(email);

    if (!user) {
      return c.json({ message: 'invalid credentials' });
    }

    const validPassword = await new Argon2id().verify(user.password, password);
    if (!validPassword) {
      return c.json({ message: 'invalid credentials' });
    }

    const cookie = await createSessionAndCookie(user.id);

    setCookie(c, cookie.name, cookie.value, cookie.attributes);

    return c.json({
      message: 'Success',
    });
  });

  hono.use(authMiddleware);
  hono.get('/me', (c) => c.json({ user: c.get('user') }));

  return hono;
};

import { Hono } from 'hono';
import { createUser } from '../db/operations';

export const createAuthRoutes = () => {
  const hono = new Hono();

  hono.post('/register', async (c) => {
    const { name, email, age } = await c.req.json();

    const user = await createUser({
      name,
      email,
      age,
    });

    return c.json({
      user,
    });
  });

  return hono;
};

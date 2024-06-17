import 'dotenv/config';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { getAllUsers } from './db/operations';
import { csrf } from 'hono/csrf';
import { createAuthRoutes } from './routes';

const app = new Hono();

app.use(csrf());
app.route('/auth', createAuthRoutes());

app.get('/', async (c) => {
  const users = await getAllUsers();
  return c.json({
    message: 'Hello World',
    users,
  });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

import 'dotenv/config';

import express from 'express';
import { getAllUsers } from './db/operations';
import { createAuthRoutes } from './routes';
import type { User } from 'lucia';

const app = express();

app.use('/auth', createAuthRoutes());

app.get('/', async (_req, res) => {
  const users = await getAllUsers();
  res.json({
    message: 'Hello World',
    users,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
    }
  }
}

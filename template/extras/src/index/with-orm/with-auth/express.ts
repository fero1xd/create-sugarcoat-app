import express from 'express';
import { getAllUsers } from './db/operations';
import { createAuthRoutes } from '../routes';

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

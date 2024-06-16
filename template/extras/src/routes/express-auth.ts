import { Router } from 'express';
import { createUser } from '../db/operations';

export const createAuthRoutes = () => {
  const router = Router();

  router.post('/register', async (req, res) => {
    const { name, email, age } = req.body;

    const user = await createUser({
      name,
      email,
      age,
    });

    return res.json({
      user,
    });
  });

  return router;
};

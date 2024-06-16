import { Router } from 'express';
import { createUser, getUser } from '../db/operations';
import { Argon2id } from 'oslo/password';
import { createSessionAndCookie } from '../auth/utils';

export const createAuthRoutes = () => {
  const router = Router();

  router.post('/register', async (req, res) => {
    const { name, email, age, password } = req.body;

    const hashedPassword = await new Argon2id().hash(password);

    const user = await createUser({
      name,
      email,
      age,
      password: hashedPassword,
    });

    return res.json({
      user,
    });
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser(email);

    if (!user) {
      return res.json({ message: 'invalid credentials' });
    }

    const validPassword = await new Argon2id().verify(user.password, password);
    if (!validPassword) {
      return res.json({ message: 'invalid credentials' });
    }

    const cookie = await createSessionAndCookie(user.id, user.name);
    res.cookie(cookie.name, cookie.value, cookie.attributes);

    return res.json({
      message: 'Success',
    });
  });

  return router;
};

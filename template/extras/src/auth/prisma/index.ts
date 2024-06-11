import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from '../db';
import { Lucia } from 'lucia';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      name: string;
    };
    UserId: number;
  }
}

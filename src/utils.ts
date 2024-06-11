import { getNpmVersion, type PM } from 'detect-package-manager';
import { readFileSync } from 'fs';
import gradient from 'gradient-string';
import path from 'path';

export const art = readFileSync(path.resolve('resources', 'art.txt'), {
  encoding: 'utf-8',
});

export const renderTitle = () => {
  const artGradient = gradient(['#ff512f', '#00c0ff', '#dd2476']);

  console.log(artGradient.multiline(art));
};

export const getPackageManagers = async () => {
  const available: PM[] = [];

  for (const manager of ['npm', 'pnpm', 'bun', 'yarn'] as const) {
    try {
      await getNpmVersion(manager);
      available.push(manager);
    } catch {}
  }

  return available;
};

export const TEMPLATE_DIR = path.resolve('template');

export type DatabaseProviders =
  | 'neon'
  | 'vercel'
  | 'supabase'
  | 'turso'
  | 'planetscale';

export type AvailableOrm = 'typeorm' | 'prisma' | 'drizzle';

export type Answers = {
  location: string;
  packageManager: PM;
  serverFramework: 'express' | 'hono';
  includeDatabase: boolean;
  database: DatabaseProviders | undefined;
  orm: AvailableOrm | undefined;
  includeLucia: boolean | undefined;
};

export const dbDir = path.join(TEMPLATE_DIR, 'extras', 'src', 'db');
export const prismaDir = path.join(dbDir, 'prisma');
export const drizzleDir = path.join(dbDir, 'drizzle');
export const typeormDir = path.join(dbDir, 'typeorm');
export const luciaDir = path.join(dbDir, '..', 'auth');

export const getAbsolute = (location: string) => {
  let absolutePath = location;
  if (!path.isAbsolute(location)) {
    absolutePath = path.resolve(location);
  }
  return absolutePath;
};

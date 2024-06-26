import type { PM } from 'detect-package-manager';
import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import { getAbsolute, type Answers, type AvailableOrm } from '../utils';

const installPackages = async (location: string, pm: PM, ...args: string[]) => {
  console.log('');
  console.log(chalk.hex('#00c0ff')('Installing dependencies'));
  const loader = ora('Installing packages with ' + pm);

  try {
    if (pm === 'npm') {
      await execa('npm', ['install', ...args], {
        cwd: location,
        stderr: 'inherit',
      });
    } else {
      loader.start();

      const p = execa({
        cwd: location,
      })`${pm} install ${[...args]}`.readable();

      p.on('data', (data) => {
        const text = data.toString();

        switch (pm) {
          case 'pnpm':
            if (text.includes('Progress')) {
              loader.text = text.includes('|')
                ? text.split(' | ')[1] ?? ''
                : text;
            }

            break;

          case 'yarn':
            loader.text = text;
            break;
        }
      });

      await new Promise((res) => {
        p.on('close', res);
        p.on('end', res);
      });
    }

    loader.succeed(`Installed all npm packages`);
  } catch (e) {
    console.log(e);
    loader.fail('Installing npm packages failed');
  }
};

const dependenciesMap = {
  serverFramework: {
    express: ['dotenv', 'express', '@types/express'],
    hono: ['hono', 'dotenv', '@hono/node-server'],
  },
  lucia: {
    base: ['lucia', 'oslo'],
    drizzle: ['@lucia-auth/adapter-drizzle'],
    prisma: ['@lucia-auth/adapter-prisma'],
    typeorm: [],
  },
  orm: {
    drizzle: {
      base: ['drizzle-orm', 'drizzle-kit'],
      neon: ['@neondatabase/serverless'],
      vercel: ['@vercel/postgres'],
      supabase: ['postgres'],
      planetscale: ['@planetscale/database'],
      turso: ['@libsql/client'],
    },
    prisma: {
      base: ['prisma', '@prisma/client'],
      turso: ['@prisma/adapter-libsql', '@libsql/client'],
    },
    typeorm: {
      base: ['typeorm', 'reflect-metadata'],
      neon: ['pg'],
      vercel: ['pg'],
      supabase: ['pg'],
      planetscale: ['mysql'],
    },
    /* eslint-disable */
  } as Record<AvailableOrm, Record<'base' | (string & {}), string[]>>,
};

export const addDependencies = async (answers: Answers) => {
  const deps = new Set<string>();

  dependenciesMap.serverFramework[answers.serverFramework].forEach((d) =>
    deps.add(d)
  );

  const { orm, database, includeDatabase, includeLucia, packageManager } =
    answers;
  const location = getAbsolute(answers.location);

  if (!includeDatabase || !orm || !database) {
    await installPackages(location, packageManager, ...Array.from(deps));
    return;
  }

  const ormDeps = dependenciesMap.orm[orm];

  ormDeps.base.forEach((d) => deps.add(d));
  ormDeps[database]?.forEach((d) => deps.add(d));

  if (includeLucia) {
    dependenciesMap.lucia.base.forEach((d) => deps.add(d));
    dependenciesMap.lucia[orm].forEach((d) => deps.add(d));
  }

  await installPackages(location, packageManager, ...Array.from(deps));
};

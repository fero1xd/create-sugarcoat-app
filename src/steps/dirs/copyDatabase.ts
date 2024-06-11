import fs from 'fs-extra';
import path from 'path';
import {
  dbDir,
  drizzleDir,
  prismaDir,
  typeormDir,
  type AvailableOrm,
  type DatabaseProviders,
} from '../../utils';

export const map = {
  neon: 'pg',
  planetscale: 'mysql',
  supabase: 'pg',
  vercel: 'pg',
  turso: 'sqlite',
} as Record<DatabaseProviders, 'pg' | 'mysql' | 'sqlite'>;

const dirMap = {
  drizzle: drizzleDir,
  prisma: prismaDir,
  typeorm: typeormDir,
};

const scriptsMap = {
  drizzle: {
    'db:generate': 'drizzle-kit generate',
    'db:studio': 'drizzle-kit studio',
    'db:migrate': 'drizzle-kit migrate',
  },
  prisma: {
    'db:generate': 'prisma migrate dev',
    'db:migrate': 'prisma migrate deploy',
    'db:studio': 'prisma studio',
  },
};

export const copyDatabaseDir = async (
  dbProvider: DatabaseProviders,
  orm: AvailableOrm,
  location: string,
  addAuth: boolean
) => {
  const type = map[dbProvider];
  if (!type) {
    return console.log('nothing found for', dbProvider);
  }
  const newDbDir = path.join(location, 'src', 'db');

  const dbFile = path.join(newDbDir, 'index.ts');
  const opsFile = path.join(newDbDir, 'operations.ts');

  // Copies operations.ts
  await fs.copy(path.join(dirMap[orm], `operations.ts`), opsFile);

  if (orm === 'prisma') {
    // Copies schema
    await fs.copy(
      path.join(prismaDir, `schema.${type}${addAuth ? '-auth' : ''}.prisma`),
      path.join(location, 'prisma', 'schema.prisma')
    );

    // Copies db connection
    await fs.copy(
      path.join(
        prismaDir,
        dbProvider === 'turso' ? `prisma-libsql.ts` : 'prisma.ts'
      ),
      dbFile
    );
  } else if (orm === 'drizzle') {
    // Copies schema
    await fs.copy(
      path.join(drizzleDir, type, `schema${addAuth ? '-with-auth' : ''}.ts`),
      path.join(newDbDir, 'schema.ts')
    );
    // Copies db conn
    await fs.copy(path.join(drizzleDir, type, `${dbProvider}.ts`), dbFile);

    // Copy config
    if (dbProvider !== 'turso') {
      await fs.copy(
        path.join(dbDir, 'config', `drizzle.config.${type}.ts`),
        path.join(location, 'drizzle.config.ts')
      );
    } else {
      await fs.copy(
        path.join(dbDir, 'config', `drizzle.config.turso.ts`),
        path.join(location, 'drizzle.config.ts')
      );
    }
  } else if (orm === 'typeorm') {
    // Turso not included in here
    // Copies entities
    await fs.copy(
      path.join(typeormDir, 'schema.ts'),
      path.join(newDbDir, 'schema.ts')
    );

    // Copies db conn
    await fs.copy(path.join(typeormDir, `index.${type}.ts`), dbFile);
  }

  if (orm === 'typeorm') return;

  const scripts = scriptsMap[orm];
  const packageJson = await fs.readJSONSync(
    path.join(location, 'package.json')
  );
  const prevScripts = packageJson.scripts as Record<string, string>;

  packageJson.scripts = {
    ...prevScripts,
    ...scripts,
  };

  await fs.writeJsonSync(path.join(location, 'package.json'), packageJson, {
    spaces: 2,
  });
};

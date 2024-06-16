import path from 'path';
import { luciaDir, routesDir, type Answers } from '../../utils';
import { map } from './copyDatabase';
import fs from 'fs-extra';

export const copyLucia = async (answers: Answers, absolutePath: string) => {
  const { includeDatabase, orm, database, includeLucia, serverFramework } =
    answers;

  if (
    !orm ||
    !includeDatabase ||
    !database ||
    !includeLucia ||
    orm === 'typeorm'
  )
    return;

  const type = map[database];

  await fs.copy(
    path.join(routesDir, `${serverFramework}-auth.ts`),
    path.join(absolutePath, 'src', 'routes', 'index.ts')
  );

  if (orm === 'drizzle') {
    await fs.copy(
      path.join(luciaDir, 'drizzle', `index.${type}.ts`),
      path.join(absolutePath, 'src', 'auth', 'index.ts')
    );
  } else {
    await fs.copy(
      path.join(luciaDir, 'prisma', `index.ts`),
      path.join(absolutePath, 'src', 'auth', 'index.ts')
    );
  }
};

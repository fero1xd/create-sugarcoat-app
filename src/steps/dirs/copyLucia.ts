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
  const remoteAuthDir = path.join(absolutePath, 'src', 'auth');

  await fs.copy(
    path.join(routesDir, `${serverFramework}-auth.ts`),
    path.join(absolutePath, 'src', 'routes', 'index.ts')
  );
  await fs.copy(
    path.join(routesDir, '..', 'middlewares', `${serverFramework}-auth.ts`),
    path.join(absolutePath, 'src', 'middlewares', 'auth.ts')
  );

  if (orm === 'drizzle') {
    await fs.copy(
      path.join(luciaDir, 'drizzle', `index.${type}.ts`),
      path.join(remoteAuthDir, 'index.ts')
    );
  } else {
    await fs.copy(
      path.join(luciaDir, 'prismaa', `index.ts`),
      path.join(remoteAuthDir, 'index.ts')
    );
  }

  await fs.copy(
    path.join(luciaDir, 'utils.ts'),
    path.join(remoteAuthDir, 'utils.ts')
  );
};

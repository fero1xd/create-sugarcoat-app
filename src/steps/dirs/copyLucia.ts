import path from 'path';
import { luciaDir, type Answers } from '../../utils';
import { map } from './copyDatabase';
import fs from 'fs-extra';

export const copyLucia = async (answers: Answers, absolutePath: string) => {
  const { includeDatabase, orm, database } = answers;

  if (!orm || !includeDatabase || !database || orm === 'typeorm') return;

  const type = map[database];

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

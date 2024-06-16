import path from 'path';
import fs from 'fs-extra';
import { spinner } from '@clack/prompts';
import { getAbsolute, TEMPLATE_DIR, type Answers } from '../../utils';
import { copyDatabaseDir } from './copyDatabase';
import { copyLucia } from './copyLucia';

export const createProjectDir = async (answers: Answers) => {
  const {
    location,
    serverFramework,
    orm,
    database,
    includeDatabase,
    includeLucia,
  } = answers;

  const absolutePath = getAbsolute(location);

  const loader = spinner();
  loader.start('Creating your api');

  if (fs.existsSync(absolutePath)) {
    if (fs.readdirSync(absolutePath).length !== 0) {
      loader.stop('The specified location is not empty, cannot continue!', 1);
      return;
    }
  }

  await fs.copy(path.resolve('template', 'common'), absolutePath);

  // copies main index file
  moveServerIndex(serverFramework, absolutePath, orm, includeLucia || false);

  // Add database Support
  if (orm && includeDatabase && database) {
    await copyDatabaseDir(database, orm, absolutePath, includeLucia || false);
  }

  await copyLucia(answers, absolutePath);

  loader.stop('Successfuly created backend');
};

const moveServerIndex = async (
  framework: 'express' | 'hono',
  location: string,
  orm?: string,
  addAuth?: boolean
) => {
  await fs.copy(
    path.join(
      TEMPLATE_DIR,
      'extras',
      'src',
      'index',
      orm ? 'with-orm' : '',
      addAuth ? 'with-auth' : '',
      `${framework}.ts`
    ),
    path.join(location, 'src', 'index.ts')
  );
};

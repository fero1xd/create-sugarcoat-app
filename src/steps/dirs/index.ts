import path from 'path';
import fs from 'fs-extra';
import { spinner } from '@clack/prompts';
import { getAbsolute, TEMPLATE_DIR, type Answers } from '../../utils';
import { copyDatabaseDir } from './copyDatabase';
import { copyLucia } from './copyLucia';

export const createProjectDir = async (answers: Answers) => {
  const { location } = answers;

  const absolutePath = getAbsolute(location);

  const loader = spinner();
  loader.start('Creating your api');

  if (fs.existsSync(absolutePath)) {
    if (fs.readdirSync(absolutePath).length !== 0) {
      loader.stop('The specified location is not empty, cannot continue!', 1);
      return;
    }
  }

  await fs.copy(path.join(TEMPLATE_DIR, 'common'), absolutePath);

  await moveServerIndex(answers, absolutePath);
  await copyDatabaseDir(answers, absolutePath);
  await copyLucia(answers, absolutePath);

  loader.stop('Successfuly created backend');
};

const moveServerIndex = async (answers: Answers, absolutePath: string) => {
  const { orm, includeLucia, serverFramework } = answers;
  await fs.copy(
    path.join(
      TEMPLATE_DIR,
      'extras',
      'src',
      'index',
      orm ? 'with-orm' : '',
      includeLucia || false ? 'with-auth' : '',
      `${serverFramework}.ts`
    ),
    path.join(absolutePath, 'src', 'index.ts')
  );
};

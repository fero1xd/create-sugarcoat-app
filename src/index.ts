#!/usr/bin/env node

import { renderTitle } from './utils';
import { runQuestioneer } from './questioneer';
import { createProjectDir } from './steps/dirs';
import { addDependencies } from './steps/packages';
import { outro } from '@clack/prompts';
import chalk from 'chalk';

const main = async () => {
  renderTitle();
  const answers = await runQuestioneer();

  // Copies common files
  await createProjectDir(answers);

  await addDependencies(answers);

  outro(chalk.hex('#dd2476')('Thank you for using create-modern-app'));
};
main();

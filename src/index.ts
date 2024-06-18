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

  try {
    // Copies common files
    await createProjectDir(answers);

    await addDependencies(answers);
  } catch (e) {
    console.log(e);
  }
  outro(chalk.hex('#dd2476')('Thank you for using sugarcoat'));
};

main();

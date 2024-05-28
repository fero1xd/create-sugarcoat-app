#!/usr/bin/env node

import { renderTitle } from "./utils";
import { runQuestioneer } from "./questioneer";
import { createProjectDir } from "./steps/dirs";
import { installPackages } from "./steps/packages";
import { outro } from "@clack/prompts";
import chalk from "chalk";

const main = async () => {
  renderTitle();
  const answers = await runQuestioneer();

  // Copies common files
  await createProjectDir(answers);

  await installPackages(answers.location, answers.packageManager);
  // console.log(p);

  outro(chalk.hex("#dd2476")("Thank you for using create-modern-app"));
};
main();

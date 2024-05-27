#!/usr/bin/env node

import { renderTitle } from "./utils";
import { runQuestioneer } from "./questioneer";
import { createProjectDir } from "./steps/dir";

const main = async () => {
  renderTitle();
  const answers = await runQuestioneer();

  // Copies common files
  await createProjectDir(answers);

  // installPackages(p.location, p.packageManager);
  // console.log(p);
};
main();

#!/usr/bin/env node

import { renderTitle } from "./utils";
import { runQuestioneer } from "./questioneer";
import { createProjectDir } from "./steps/dir";
import { installPackages } from "./steps/packages";

const main = async () => {
  renderTitle();
  const p = await runQuestioneer();
  createProjectDir(p.location);

  await installPackages(p.location, p.packageManager);
  // console.log(p);
};

main();

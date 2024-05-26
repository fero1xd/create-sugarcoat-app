#!/usr/bin/env node

import { renderTitle } from "./utils";
import { runQuestioneer } from "./questioneer";
import path from "path";

const main = async () => {
  renderTitle();
  const p = await runQuestioneer();
};

main();

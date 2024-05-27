import path from "path";
import fs from "fs-extra";
import { spinner } from "@clack/prompts";
import { TEMPLATE_DIR, type Answers } from "../../utils";
import { copyDatabaseDir } from "./copyDatabase";

export const createProjectDir = async (answers: Answers) => {
  const { location, serverFramework, orm, database, includeDatabase } = answers;

  let absolutePath = location;
  if (!path.isAbsolute(location)) {
    absolutePath = path.resolve(location);
  }

  const loader = spinner();
  loader.start("Creating your api");

  if (fs.existsSync(absolutePath)) {
    if (fs.readdirSync(absolutePath).length !== 0) {
      loader.stop("The specified location is not empty, cannot continue!", 1);
      return;
    }
  }

  await fs.copy(path.resolve("template", "common"), absolutePath);

  // copies main index file
  moveServerIndex(serverFramework, absolutePath, orm);

  // Add database Support
  if (orm && includeDatabase && database) {
    await copyDatabaseDir(database, orm, absolutePath);
  }

  loader.stop("Successfuly created backend");
};

const moveServerIndex = (
  framework: "express" | "hono",
  location: string,
  orm?: string
) => {
  try {
    fs.copyFileSync(
      path.join(
        TEMPLATE_DIR,
        "extras",
        "src",
        "index",
        orm ? "with-orm" : "",
        `${framework.toLocaleLowerCase()}.ts`
      ),
      path.join(location, "src", "index.ts")
    );
  } catch (e) {
    console.log(e);
  }
};

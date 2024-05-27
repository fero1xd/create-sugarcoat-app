import path from "path";
import fs from "fs-extra";
import { spinner } from "@clack/prompts";
import { TEMPLATE_DIR, type Answers } from "../utils";

export const createProjectDir = async (answers: Answers) => {
  const { location, serverFramework } = answers;

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

  loader.message("Moving root file");
  moveServerIndex(serverFramework, absolutePath, answers.orm);
  loader.message("Successfuly moved root file");

  if (answers.orm && answers.includeDatabase) {
    await makeDatabaseDir(answers.database as any, answers.orm, absolutePath);
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
        orm ? `with-${orm}` : "",
        `${framework.toLocaleLowerCase()}.ts`
      ),
      path.join(location, "src", "index.ts")
    );
  } catch (e) {
    console.log(e);
  }
};

const dbDir = path.join(TEMPLATE_DIR, "extras", "src", "db");
const drizzleDir = path.join(dbDir, "drizzle");

const map = {
  neon: {
    drizzle: { index: path.join(drizzleDir, "pg") },
    prisma: path.join(drizzleDir, "prisma", ""),
  },
  prisma: {
    neon: path.join(dbDir, "prisma", "schema.pg.prisma"),
    planetscale: path.join(dbDir, "prisma", "schema.mysql.prisma"),
    supabase: path.join(dbDir, "prisma", "schema.pg.prisma"),
    turso: path.join(dbDir, "prisma", "schema.turso.prisma"),
    vercel: path.join(dbDir, "prisma", "schema.pg.prisma"),
  },
};

export const makeDatabaseDir = async (
  dbProvider: keyof (typeof map)["prisma"],
  orm: string,
  location: string
) => {
  if (orm === "prisma") {
    const schema = map.prisma[dbProvider];
    if (!schema) {
      return console.log("no prisma schema found for", dbProvider);
    }

    await fs.copy(schema, path.join(location, "prisma", "schema.prisma"));
  }
};

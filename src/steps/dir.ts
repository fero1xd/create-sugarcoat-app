import path from "path";
import fs from "fs-extra";
import { spinner } from "@clack/prompts";
import { drizzleDir, prismaDir, TEMPLATE_DIR, type Answers } from "../utils";

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

  moveServerIndex(serverFramework, absolutePath, answers.orm);

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
        orm ? "with-orm" : "",
        `${framework.toLocaleLowerCase()}.ts`
      ),
      path.join(location, "src", "index.ts")
    );
  } catch (e) {
    console.log(e);
  }
};

const map = {
  neon: "pg",
  planetscale: "mysql",
  supabase: "pg",
  vercel: "pg",
  turso: "sqlite",
};

export const makeDatabaseDir = async (
  dbProvider: keyof typeof map,
  orm: string,
  location: string
) => {
  const type = map[dbProvider] as "pg" | "mysql" | "sqlite";
  if (!type) {
    return console.log("nothing found for", dbProvider);
  }
  const dbFile = path.join(location, "src", "db", "index.ts");
  const opsFile = path.join(location, "src", "db", "operations.ts");

  if (orm === "prisma") {
    // Copies schema
    await fs.copy(
      path.join(prismaDir, `schema.${type}.prisma`),
      path.join(location, "prisma", "schema.prisma")
    );

    // Copies operations.ts
    await fs.copy(path.join(prismaDir, `operations.ts`), opsFile);

    // Copies db connection
    await fs.copy(
      path.join(
        prismaDir,
        dbProvider === "turso" ? `prisma-libsql.ts` : "prisma.ts"
      ),
      dbFile
    );
  } else if (orm === "drizzle") {
    // Copies db conn
    await fs.copy(
      path.join(drizzleDir, type, `${dbProvider}.ts`),
      path.join(location, "src", "db", "index.ts")
    );

    // Copies operations.ts
    await fs.copy(path.join(drizzleDir, `operations.ts`), opsFile);

    // Copies schema
    await fs.copy(
      path.join(drizzleDir, type, "schema.ts"),
      path.join(location, "src", "db", "schema.ts")
    );
  }
};

import { getNpmVersion, type PM } from "detect-package-manager";
import { readFileSync } from "fs";
import gradient from "gradient-string";
import path from "path";

export const art = readFileSync(path.resolve("resources", "art.txt"), {
  encoding: "utf-8",
});

export const renderTitle = () => {
  const artGradient = gradient(["#ff512f", "#00c0ff", "#dd2476"]);

  console.log(artGradient.multiline(art));
};

export const getPackageManagers = async () => {
  const available: PM[] = [];

  for (const manager of ["npm", "pnpm", "bun", "yarn"] as const) {
    try {
      await getNpmVersion(manager);
      available.push(manager);
    } catch {}
  }

  return available;
};

export const TEMPLATE_DIR = path.resolve("template");

export type Answers = {
  location: string;
  packageManager: PM;
  serverFramework: "express" | "hono";
  includeDatabase: boolean;
  database: string | undefined;
  orm: string | undefined;
  includeAuth: boolean;
  authProvider: string | undefined;
};

export const prismaDir = path.join(
  TEMPLATE_DIR,
  "extras",
  "src",
  "db",
  "prisma"
);
export const drizzleDir = path.join(
  TEMPLATE_DIR,
  "extras",
  "src",
  "db",
  "drizzle"
);
import fs from "fs-extra";
import path from "path";
import {
  drizzleDir,
  prismaDir,
  typeormDir,
  type AvailableOrm,
  type DatbaseProviders,
} from "../../utils";

const map = {
  neon: "pg",
  planetscale: "mysql",
  supabase: "pg",
  vercel: "pg",
  turso: "sqlite",
} as Record<DatbaseProviders, "pg" | "mysql" | "sqlite">;

const dirMap = {
  drizzle: drizzleDir,
  prisma: prismaDir,
  typeorm: typeormDir,
};

export const copyDatabaseDir = async (
  dbProvider: DatbaseProviders,
  orm: AvailableOrm,
  location: string
) => {
  const type = map[dbProvider];
  if (!type) {
    return console.log("nothing found for", dbProvider);
  }
  const dbDir = path.join(location, "src", "db");

  const dbFile = path.join(dbDir, "index.ts");
  const opsFile = path.join(dbDir, "operations.ts");

  // Copies operations.ts
  await fs.copy(path.join(dirMap[orm], `operations.ts`), opsFile);

  if (orm === "prisma") {
    // Copies schema
    await fs.copy(
      path.join(prismaDir, `schema.${type}.prisma`),
      path.join(location, "prisma", "schema.prisma")
    );

    // Copies db connection
    await fs.copy(
      path.join(
        prismaDir,
        dbProvider === "turso" ? `prisma-libsql.ts` : "prisma.ts"
      ),
      dbFile
    );
  } else if (orm === "drizzle") {
    // Copies schema
    await fs.copy(
      path.join(drizzleDir, type, "schema.ts"),
      path.join(dbDir, "schema.ts")
    );
    // Copies db conn
    await fs.copy(path.join(drizzleDir, type, `${dbProvider}.ts`), dbFile);
  } else if (orm === "typeorm") {
    // Turso not included in here
    // Copies entities
    await fs.copy(
      path.join(typeormDir, "schema.ts"),
      path.join(dbDir, "schema.ts")
    );

    // Copies db conn
    await fs.copy(path.join(typeormDir, `index.${type}.ts`), dbFile);
  }
};

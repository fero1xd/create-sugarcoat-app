import * as p from "@clack/prompts";
import { getPackageManagers, type Answers } from "./utils";
import type { PM } from "detect-package-manager";

export const runQuestioneer = async () => {
  const pms = await getPackageManagers();

  const group = await p.group(
    {
      location: () =>
        p.text({
          message: "Where do you want to create your api?",
          placeholder: ".",
          defaultValue: ".",
          validate: (value) => {
            if (!value) return "Please enter a path.";
            if (value[0] !== ".") return "Please enter a relative path.";
          },
        }),
      packageManager: () =>
        p.select({
          message: "What package manager do you want to use?",
          initialValue: "npm",

          options: pms.map((pm) => ({ label: pm, value: pm })),
        }),
      serverFramework: () =>
        p.select({
          message: "What server framework do you want to use?",
          initialValue: "hono",
          options: [
            {
              label: "Hono",
              value: "hono",
            },
            {
              label: "Express",
              value: "express",
            },
          ],
        }),
      includeDatabase: () =>
        p.confirm({
          message: "Do you want to use a database?",
        }),
      database: ({ results: { includeDatabase } }) => {
        if (!includeDatabase) return;
        return p.select({
          message: "What database provider you want to use?",
          options: [
            {
              label: "Neon",
              value: "neon",
            },
            {
              label: "Planetscale",
              value: "planetscale",
            },
            {
              label: "Supabase",
              value: "supabase",
            },
            {
              label: "Turso",
              value: "turso",
            },
            {
              label: "Vercel PG",
              value: "vercel",
            },
          ],
        });
      },
      orm: ({ results: { includeDatabase, database } }) => {
        if (!includeDatabase) return;

        const options = [
          {
            label: "Drizzle",
            value: "drizzle",
          },
          {
            label: "Prisma",
            value: "prisma",
          },
        ];

        if (database !== "turso") {
          // Will have to look into libsql support in typeorm
          options.push({
            label: "Typeorm",
            value: "typeorm",
          });
        }

        return p.select({
          message: "What database orm do you want to use?",
          initialValue: "drizzle",
          options,
        });
      },
      includeLucia: ({ results: { includeDatabase } }) =>
        includeDatabase
          ? p.confirm({
              message: "Do you want to add lucia auth to your api?",
            })
          : undefined,
    },
    {
      onCancel: () => process.exit(1),
    }
  );

  return group as Answers;
};

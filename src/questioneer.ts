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
      orm: ({ results: { includeDatabase } }) => {
        if (!includeDatabase) return;
        return p.select({
          message: "What database orm do you want to use?",
          initialValue: "drizzle",
          options: [
            {
              label: "Drizzle",
              value: "drizzle",
            },
            {
              label: "Prisma",
              value: "prisma",
            },
            {
              label: "Typeorm",
              value: "typeorm",
            },
          ],
        });
      },
      includeAuth: () =>
        p.confirm({
          message: "Do you want to add authentication to your api?",
        }),
      authProvider: ({ results: { includeAuth, includeDatabase } }) => {
        if (!includeAuth) return;
        const options = [
          {
            label: "Clerk",
            value: "clerk",
          },
          {
            label: "Kinde",
            value: "kinde",
          },
        ];

        if (includeDatabase) {
          options.unshift({
            label: "Lucia",
            value: "lucia",
          });
        }

        return p.select({
          message: "What auth solution do you want to use?",
          options,
        });
      },
    },
    {
      onCancel: () => process.exit(1),
    }
  );

  return group as Answers;
};

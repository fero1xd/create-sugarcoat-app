import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const app = express();

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: "Hello World",
    users,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

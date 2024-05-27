import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

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

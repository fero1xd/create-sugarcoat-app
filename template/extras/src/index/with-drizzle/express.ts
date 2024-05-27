import express from "express";
import db from "./db";

const app = express();

app.get("/", async (req, res) => {
  const users = await db.query.users.findMany();
  res.json({
    message: "Hello World",
    users,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

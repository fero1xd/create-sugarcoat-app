import express from "express";
import { getAllUsers } from "./db/operations";

const app = express();

app.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.json({
    message: "Hello World",
    users,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

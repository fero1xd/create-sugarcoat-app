import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getAllUsers } from "./db/operations";

const app = new Hono();
app.get("/", async (c) => {
  const users = await getAllUsers();
  return c.json({
    message: "Hello World",
    users,
  });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

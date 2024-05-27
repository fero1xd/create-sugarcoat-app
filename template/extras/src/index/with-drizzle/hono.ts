import { serve } from "@hono/node-server";
import { Hono } from "hono";
import db from "./db";

const app = new Hono();
app.get("/", async (c) => {
  const users = await db.query.users.findMany();
  return c.json({
    message: "Hello World",
    users,
  });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

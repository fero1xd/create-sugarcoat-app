import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.json({ message: "Hello World" }));

serve({
  fetch: app.fetch,
  port: 3000,
});

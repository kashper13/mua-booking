import { Hono } from "hono";

import { healthRoutes } from "./routes/health";

export const app = new Hono();

app.route("/api", healthRoutes);

app.notFound((c) => c.json({ error: "Not Found" }, 404));

export default app;

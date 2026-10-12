import { Hono } from "hono";

import type { HealthResponse } from "../../shared/health";

export const healthRoutes = new Hono();

healthRoutes.get("/health", (c) => {
  const body = { ok: true } satisfies HealthResponse;
  return c.json(body);
});

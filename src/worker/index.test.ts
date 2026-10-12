import { describe, expect, it } from "vitest";

import { app } from "./index";

describe("GET /api/health", () => {
  it("returns a JSON health payload", async () => {
    const response = await app.request("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/json/);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });
});

describe("unknown API routes", () => {
  it("returns JSON 404 instead of an HTML document", async () => {
    const response = await app.request("/api/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toMatch(/json/);

    const body = await response.text();
    expect(body).not.toMatch(/<html/i);
    expect(JSON.parse(body)).toEqual({ error: "Not Found" });
  });
});

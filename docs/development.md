# Development

## Prerequisites

- Node.js 22 or newer (see `.nvmrc`)
- npm
- Cursor or any editor

Cloudflare account authentication is **not** required for Phase 0 local development. Do not run `wrangler login` or create remote resources for this phase.

## Install

From the repository root:

```bash
npm install
```

## Scripts

| Script                 | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Vite + Cloudflare Vite plugin (Worker and SPA)            |
| `npm run build`        | Typecheck then production build                           |
| `npm run preview`      | Serve the production build in the Workers runtime         |
| `npm run typecheck`    | TypeScript project references (`tsc -b`)                  |
| `npm run lint`         | ESLint                                                    |
| `npm run format`       | Prettier write                                            |
| `npm run format:check` | Prettier check                                            |
| `npm run test`         | Vitest once                                               |
| `npm run test:watch`   | Vitest watch                                              |
| `npm run cf-typegen`   | Generate `worker-configuration.d.ts` from Wrangler config |

There is no deploy script. Do not deploy Phase 0.

## Environment files

| File                 | Role                                              |
| -------------------- | ------------------------------------------------- |
| `.env.example`       | Documented public Vite variables (`VITE_*`)       |
| `.dev.vars.example`  | Documented Worker secrets for local Wrangler/Vite |
| `.env` / `.dev.vars` | Local-only; gitignored                            |

Phase 0 needs no values in either file. Copy an example only when a later phase introduces a variable:

```bash
cp .env.example .env
cp .dev.vars.example .dev.vars
```

Never commit secrets. Never put production credentials in examples.

## TypeScript, lint, and tests

- TypeScript runs in **strict** mode for the client, Worker, and Node config files.
- ESLint uses the flat config in `eslint.config.js`.
- Prettier is the formatter; ESLint defers formatting to Prettier.
- Vitest covers the Hono health route, unknown API 404 JSON, and SPA route rendering.

After generating Worker types:

```bash
npm run cf-typegen
```

Commit the generated `worker-configuration.d.ts` when bindings change so typecheck does not depend on a live Cloudflare login.

## Local routing checks

With `npm run dev` or `npm run preview`:

- `GET /` → HTML public shell
- `GET /admin` → HTML admin placeholder (SPA fallback)
- `GET /missing` → HTML shell; React Router shows Not Found
- `GET /api/health` → `200` JSON `{ "ok": true }`
- `GET /api/does-not-exist` → `404` JSON, not the SPA

## Cloudflare deployment approach (later)

Phase 0 does not create D1 databases, R2 buckets, Turnstile widgets, or dashboard WAF rules.

When a later phase is approved to go live:

1. Add approved bindings to `wrangler.jsonc`.
2. Put secrets in Cloudflare with `wrangler secret put` (never in Git).
3. Run `npm run cf-typegen`.
4. Run `npm run build`.
5. Deploy the Vite plugin output with Wrangler.

Until then, keep all storage and credentials local or absent.

## Design specification

If `docs/mua-booking-design-spec.md` is added, treat it as the UI/UX source of truth. Do not implement branded components until that file exists in this repository.

# MUA Booking

Booking management application for a professional makeup artist in Basilan, Philippines.

This repository is in **Phase 0**: a maintainable Cloudflare Workers foundation with a minimal application shell. Booking workflows, authentication, payments, and branded UI are intentionally absent.

## Stack

- React, TypeScript, Vite, Tailwind CSS
- Hono API on a single Cloudflare Worker
- Workers Static Assets for the SPA
- npm

## Local development

Use Node.js 22 or newer (`.nvmrc`). If you use nvm:

```bash
nvm use
npm install
npm run dev
```

Then open the Vite URL printed in the terminal (typically `http://localhost:5173`).

| Path          | What you should see               |
| ------------- | --------------------------------- |
| `/`           | Public shell stub                 |
| `/admin`      | Unauthenticated admin placeholder |
| `/api/health` | `{ "ok": true }`                  |

Additional commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview
```

See [docs/development.md](docs/development.md) for environment files, tooling, and the future deployment approach.

## Status

- Design specification (`docs/mua-booking-design-spec.md`) is **not in this repository**. Rosé Arch UI work is blocked until that file is added.
- No Cloudflare resources have been created.
- Do not deploy this Phase 0 shell to production.

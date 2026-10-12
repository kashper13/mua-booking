# MUA Booking

Booking management application for a professional makeup artist in Basilan, Philippines.

This repository is in **Phase 1B**: the Rosé Arch public homepage on the Cloudflare Workers foundation. Booking workflows, authentication, and payments are intentionally absent.

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

| Path                 | What you should see                              |
| -------------------- | ------------------------------------------------ |
| `/`                  | Public homepage (placeholders, booking not open) |
| `/admin`             | Unauthenticated admin placeholder                |
| `/dev/design-system` | Component showcase (local `npm run dev` only)    |
| `/api/health`        | `{ "ok": true }`                                 |

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

- Design specification: [`docs/mua-booking-design-spec.md`](docs/mua-booking-design-spec.md) (**DRAFT v0.4**).
- No Cloudflare resources have been created.
- Do not deploy until a later phase. The homepage does not accept bookings.

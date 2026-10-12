# Architecture

Phase 0 establishes a single-repository, single-Worker application. Later phases must keep this shape unless a later review approves a split.

## Decision summary

| Decision     | Choice                                         | Why                                                         |
| ------------ | ---------------------------------------------- | ----------------------------------------------------------- |
| Repository   | One Git repo at `/Users/kash/Projects/booking` | Avoid nested apps and duplicate tooling                     |
| Compute      | One Cloudflare Worker named `mua-booking`      | API and static assets deploy together                       |
| Frontend     | One React SPA                                  | Public and admin share the design system and origin         |
| Routing      | React Router as a client library               | Cloudflare's recommended SPA approach on Workers            |
| API          | Hono under `/api/*`                            | Worker-first routing without a second service               |
| Styling      | Tailwind CSS                                   | Rosé Arch tokens live in the Tailwind v4 theme              |
| Data         | None in Phase 0                                | D1, R2, and Drizzle are deferred until schemas are approved |
| Compat flags | No `nodejs_compat`                             | No installed dependency requires it                         |

## Runtime shape

```
Browser
  ├── /            public SPA (PublicLayout)
  ├── /admin       admin SPA placeholder (AdminLayout)
  └── /api/*       Hono Worker (run_worker_first)
```

`wrangler.jsonc` uses Workers Static Assets with:

- `assets.not_found_handling: "single-page-application"` so unknown **document** routes serve `index.html` for React Router
- `assets.run_worker_first: ["/api/*"]` so API paths always hit Hono and never fall back to the SPA

The Worker currently exposes `GET /api/health` and returns JSON `404` for any other `/api/*` path.

## Project structure

```
src/
  client/     React SPA: layouts, pages, error boundary, styles
  worker/     Hono entry and API routes
  shared/     Types shared by client and Worker
docs/         Architecture and development notes
```

Public and admin UIs are **route groups**, not separate applications.

## Cloudflare configuration

Phase 0 configuration is local-only:

- Worker name: `mua-booking`
- Compatibility date: `2026-10-12`
- No D1 databases
- No R2 buckets
- No Turnstile keys
- No production secrets
- No deploy

`wrangler types` generates `worker-configuration.d.ts` from `wrangler.jsonc`. Do not hand-write binding interfaces. Bindings will be added in a later phase, then types regenerated.

Future production deploy (not to be run in Phase 0):

1. Create D1 / R2 / secrets in the Cloudflare account when those phases are approved.
2. Add bindings to `wrangler.jsonc`.
3. `npm run build`
4. `npx wrangler deploy` using the Vite plugin output in `dist/`

WAF rules belong in the Cloudflare dashboard, not in this repository.

## Security boundaries

These rules are in force now and remain in force after Phase 0:

1. **Client-side routing is not security.** `/admin` is a visible placeholder. Hiding or splitting frontend routes does not protect data or actions.
2. **Future `/api/admin/*` endpoints must enforce server-side authentication and authorization** in the Worker. The SPA must not be treated as a gate.
3. **No real customer data may be exposed** through the frontend or any API.
4. **No administrative mutations may be implemented** until authn/authz is designed and approved.
5. **No production booking functionality may be enabled** in this phase or by expanding `/api/health`.
6. **Authentication architecture will be designed and approved in a later phase.** Do not add temporary bypasses, hardcoded administrator credentials, shared passwords, or “auth later” backdoors.

Phase 0 therefore ships no login, no session cookies, no mock admin datasets, and no booking write APIs.

## Known limitations

- UI/UX follows `docs/mua-booking-design-spec.md` (DRAFT v0.4). Unconfirmed business rules marked in that document must not be implemented.
- The public homepage is presentational. The business name, photos, prices, reviews, and contact links stay placeholders until the owner supplies them. Online booking is not available.
- Do not invent policies, services, or calendar behavior beyond the approved specification.
- There is no persistence layer.
- Preview and production behavior depend on Cloudflare Workers Static Assets; local `vite` uses the Cloudflare Vite plugin so `/api/*` routing matches that model.

## Payments

**OUT OF SCOPE — MVP.** Recorded in [`docs/product-requirements.md`](product-requirements.md).

The owner has not confirmed reservation deposits or online payments. Customers will submit booking requests that stay pending until the owner approves or declines them. Approval must not depend on payment. A configured service price may be displayed; displaying a price is not collecting a payment.

The MVP must not include payment gateways, GCash or Maya, online deposits, payment collection forms, payment screenshot uploads, payment verification, refunds, payment transaction records, or payment-related booking statuses.

Do not add payment dependencies, schemas, or APIs. Future payment functionality requires explicit business owner approval and a separate design review.

## Out of scope until later phases

Booking workflows, customer management, calendar logic, admin authentication, database schemas, D1/R2 bindings, Turnstile, and production APIs.

Payment functionality is not in that later-phase list. It stays **OUT OF SCOPE — MVP** until the owner approves it and a separate design review is complete.

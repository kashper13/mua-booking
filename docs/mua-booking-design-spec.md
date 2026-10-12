# MUA Booking App — Design Specification (Rosé Arch)

**Status:** DRAFT v0.4 — Phase 2 Steps 1–2 approved (with refinements); Step 3 in review. Not approved for implementation.
**Date:** 12 Oct 2026
**Source of truth:** Design canvas "MUA Booking — Rosé Arch" (pages: *Customer booking*, *Admin dashboard*)
**Scope:** UI/UX only. No backend, schema, auth or payment design.

> Business rules marked **⚠ UNCONFIRMED** are placeholders awaiting the business owner's answers. Do not implement logic for them yet.

---

## 0. Open business decisions (blocking)

| # | Decision | Where it shows in UI | Current design treatment |
|---|---|---|---|
| B1 | Time model: fixed slots vs. open start time vs. "request a time" | Booking step 3, Admin › Availability | Sample slot grid; labelled "preferred time" |
| B2 | Bookings per day / capacity | Availability, Calendar | "Not set" row in Availability › Booking rules |
| B3 | Does a **Pending** request hold the slot? | Customer date/time availability, Admin calendar | Pending shown separately; conflict notice is informational only |
| B4 | Group / entourage bookings (headcount) | Booking step 1/4 | Not asked; customer can mention in Notes |
| B5 | Travel area & fees | Step 4 location, Services | Free-text location only |
| B6 | Deposits / reservation fee | Review, Confirmation, Admin approve | Not shown anywhere |
| B7 | Cancellation / reschedule policy | Review, Status page | Not shown; "Message on Messenger" to change |
| B8 | How customers are notified of approve/decline | Confirmation, Admin approve sheet | Status lookup page + optional "open Messenger with prepared message" |
| B9 | Business name, logo, real photos, testimonials | Everywhere | `[Artist Name]`, `[Name]`, photo placeholders |
| B10 | Prices & durations | Services, steps 1/5 | `₱ [price]`, `[duration]` placeholders |

---

## 1. Design tokens

### 1.1 Color — brand

| Token | Hex | Use |
|---|---|---|
| `color.petal` | `#FFF7F4` | Page background (customer + admin) |
| `color.blush` | `#F4DCD6` | Secondary buttons, chips, soft surfaces |
| `color.blush-tint` | `#FBEAE5` | Info cards, selected-card fill, input prefix |
| `color.rosewood` | `#8C4A55` | Primary CTA, links, selected state, progress |
| `color.rosewood-dark` | `#6E3540` | Link hover, text on blush |
| `color.plum-ink` | `#3B2A30` | Primary text, dark chips, FAB, toasts |
| `color.mauve` | `#7A666C` | Secondary text |
| `color.mauve-dark` | `#6B5157` | Inactive tab labels |
| `color.sage` | `#7E8C76` | **Decorative only** (rules, ornaments) — 3.37:1, never body text |
| `color.sage-text` | `#5F6B58` | Sage-coloured text (eyebrows) |
| `color.surface` | `#FFFFFF` | Cards, inputs, sheets, admin lists |
| `color.border` | `#EBD3CC` | Card borders, dividers |
| `color.divider-soft` | `#F4DCD6` | Row dividers inside cards |
| `color.input-border` | `#9E8890` | Form control borders (3.29:1 on white — meets 3:1 non-text) |
| `color.photo-1/2/3` | `#E9C9C1` / `#DFD9CF` / `#FBEAE5` | Image placeholders / LQIP backgrounds |

### 1.2 Color — status (semantic)

Every status = **icon + text label + colour**. Never colour alone.

| Status | Token | Background | Text/Icon | Icon | Contrast |
|---|---|---|---|---|---|
| Requested | `status.requested` | `#F4DCD6` | `#6E3540` | paper plane | 7.15:1 |
| Pending approval | `status.pending` | `#FCEFD9` | `#7A4B0E` | clock | 6.51:1 |
| Confirmed | `status.confirmed` | `#E3EBDF` | `#3D5536` | check | 6.75:1 |
| Declined | `status.declined` | `#FBE4E1` | `#8A1F17` | x-circle | 7.55:1 |
| Cancelled | `status.cancelled` | `#ECE7E8` | `#4F464A` | slash-circle | 7.44:1 |
| Blocked (calendar) | `status.blocked` | stripes `#ECE7E8`/`#F7F3F4` 135° | `#5A5054` | — | pattern + "Blocked" label |

Rules:
- A check mark is used **only** for Confirmed. Submission success uses the paper-plane icon.
- Pending is never styled green or with success language.
- "Requested" and "Pending approval" may collapse into one stored status; the UI keeps "Requested" as a timeline step.

### 1.3 Color — feedback

| Token | Value | Use |
|---|---|---|
| `feedback.error` | `#B42318` | Error input border (2px), destructive button bg (white text 6.57:1) |
| `feedback.error-text` | `#A61B1B` | Inline error text (7.11:1 on petal) |
| `feedback.error-bg` / `-border` | `#FBE4E1` / `#E8B4AE` | Error summary / alert |
| `feedback.warn-bg` / `-text` | `#F6EFE2` / `#6A420C` | Informational warnings (overlap, irreversible) |
| `feedback.info-bg` / `-text` | `#EEF1EB` / `#3D4A37` | Neutral info (day free, Messenger fallback) |
| `action.approve` | `#3D5536` | Approve button (white text 8.23:1) |
| `scrim` | `#8E8085` (≈ plum @ 55%) | Behind bottom sheets |

### 1.4 Typography

Fonts (Google Fonts, `display=swap`, Latin subset):
- **DM Serif Display** 400 + italic — editorial headings only
- **Karla** 400 / 500 / 600 / 700 — all body, UI, forms, admin

| Token | Font | Size / line-height | Weight | Use |
|---|---|---|---|---|
| `type.display` | DM Serif | 38 / 1.12 | 400 | Homepage hero (desktop scales up, see §6) |
| `type.h1` | DM Serif | 28–32 / 1.15 | 400 | Page/step titles |
| `type.h1-admin` | DM Serif | 26 / 1.2 | 400 | Admin page titles |
| `type.h2` | DM Serif | 26 / 1.2 | 400 | Customer section titles |
| `type.h2-admin` | Karla | 17–18 / 1.3 | 700 | Admin section titles |
| `type.card-title` | DM Serif | 18–19 / 1.25 | 400 | Service names (customer) |
| `type.body-lg` | Karla | 16 / 1.5 | 400 | Body, input text (**min 16px on inputs** — prevents iOS zoom) |
| `type.body` | Karla | 15 / 1.5 | 400 | Secondary body, labels (700) |
| `type.small` | Karla | 13–14 / 1.45 | 400 | Meta, helper text |
| `type.micro` | Karla | 12 / 1.3 | 600–700 | Tab labels, compact chips |
| `type.eyebrow` | Karla | 12–13, tracking 0.12–0.16em, uppercase | 700 | Kickers |

Rules: no DM Serif below 18px; never use DM Serif for form labels, prices or admin data.

### 1.5 Spacing, radius, elevation

- **Spacing scale (px):** 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40
- Mobile page gutter: **16px** (cards), **20px** (text blocks)
- Section spacing: 20–32px; form field gap: 18px; label→input: 6px

| Radius token | px | Use |
|---|---|---|
| `radius.sm` | 8–10 | Calendar cells, small tiles |
| `radius.md` | 12–14 | Inputs, time slots, alerts |
| `radius.lg` | 16–20 | Cards, panels |
| `radius.sheet` | 24 (top only) | Bottom sheets |
| `radius.pill` | 999 / height÷2 | Buttons, chips |
| `radius.arch` | `W/2 W/2 8–12 8–12` | Signature arch: photos, thumbnails, empty-state icons, testimonial |

Elevation: flat by default (borders, not shadows). Shadows only on floating elements:
- Sticky bars: `0 -6px 20px rgba(59,42,48,.08)`
- FAB: `0 6px 18px rgba(59,42,48,.25)`

### 1.6 Sizing

- Minimum touch target: **44×44px**
- Buttons: 52px (primary, mobile), 48px (secondary/inline), 40–44px (chips/header)
- Inputs: 52px (48 in dense admin panels)
- Admin bottom nav: 72px

---

## 2. Component inventory

| Component | Variants | Notes |
|---|---|---|
| **Button** | primary (rosewood), secondary (blush), outline (1px input-border), approve (green), destructive (red solid / red 2px outline), text-link | Pill shape. States below. Icon optional, left. |
| **Icon button** | circle 44 (blush or transparent) | Always `aria-label` |
| **Status chip** | 5 statuses × sizes md (14px) / sm (12px) | Icon + label, pill |
| **Step header** | back button + title + 5-segment progress + "Step N of 5 · Label" | Segments: done/current = rosewood, upcoming = border |
| **Sticky action bar** | summary line + primary CTA; or 2-button grid | Bottom of booking steps & admin detail |
| **Selectable card (radio)** | default / selected (2px rosewood, blush-tint fill) | Whole card is the `<label>` |
| **Calendar — customer** | day: available / unavailable (strikethrough, disabled) / selected (filled circle) | 7-col grid, 44px cells, legend required |
| **Calendar — admin** | day: plain / today (2px plum outline) / selected (rosewood fill) / blocked (stripes) + markers: confirmed dot, pending ring | Each cell has a computed `aria-label` |
| **Time slot** | available / selected (filled + check) / unavailable (dashed, struck, "Unavailable") | 2-col grid, 52px |
| **Text input** | default / focus / filled / error / disabled; prefix slot (`+63`, `₱`) | Label above, helper below, error below helper |
| **Textarea** | with counter | |
| **Select** | native, custom chevron | |
| **Radio pill / radio card** | default / selected | |
| **Checkbox** | with multi-line label | accent rosewood |
| **Switch** | on (green) / off (grey) + text "Shown/Hidden" | `role="switch"`, label states purpose |
| **Alert / callout** | info, warning, error, pending notice | Icon + text; `role="alert"` for errors |
| **Error summary** | list of links to fields | Shown on submit failure, top of form |
| **Summary list** | rows with label/value + "Edit" link | Review step, admin detail (`<dl>`) |
| **Timeline** | done / current (`aria-current="step"`) / upcoming (dashed) | Confirmation, admin history |
| **Booking list card (admin)** | name, status chip, service · date · time, location · age, optional warning, quick Decline/Approve | |
| **Agenda row** | time + name + service/location + status; left border coloured; cancelled = struck | |
| **Stat tile** | number + label | Admin overview |
| **Attention banner** | count + summary + "Review" | Admin overview |
| **Bottom sheet / dialog** | approve, decline | `role="dialog" aria-modal`, focus trap, grabber |
| **Bottom tab bar (admin)** | Home, Requests (badge), Calendar, Manage | `aria-current="page"` |
| **FAB** | extended ("New booking") / round | Admin home & calendar |
| **Segmented control** | Month / Week / Day | `role="tablist"` |
| **Filter chips** | Pending · n / Confirmed / Declined / Cancelled | Horizontal scroll |
| **Empty state** | arch icon + title + text + 1–2 actions | |
| **Skeleton** | blocks in `#F1E2DE` | Pulse animation, disabled under reduced motion |
| **Toast** | plum bg, petal text, check | `role="status"`, auto-dismiss 4s |
| **Turnstile slot** | 66px reserved box | Prevent layout shift while widget loads |

### 2.1 Interaction states (all interactive components)

| State | Treatment |
|---|---|
| Hover (pointer devices) | Primary → `#6E3540`; secondary → `#EBCFC8`; cards → border `#D9B9B1` |
| Focus-visible | 2px `#3B2A30` outline, 2px offset (never removed) |
| Active/pressed | scale 0.98, 100ms |
| Selected | rosewood fill or 2px rosewood border + blush-tint |
| Disabled | 40–50% contrast reduction, `cursor: not-allowed`, still has text label; not focusable for slots/dates |
| Loading | button keeps width, spinner + verb ("Sending request…"), `aria-busy`, disabled |
| Error | 2px `#B42318` border + icon + message; `aria-invalid`, `aria-describedby` |

Motion: 150–200ms ease-out; bottom sheets slide 250ms. Respect `prefers-reduced-motion` (no slide/pulse).

---

## 3. Customer screens

### 3.0 Home (compact hero)
- Header: wordmark, "Check status" link, menu button.
- Hero (≤ ~300px tall on mobile): eyebrow, H1, one-line descriptor, arch photo (132×188) to the right.
- CTA row: "Request a booking" (primary, flex) + Messenger icon button.
- Category tiles (Bridal / Debut / Graduation / Events) → portfolio filtered.
- About card, recent work (3 arch thumbnails), services preview (2–3 rows), testimonial (arch-top rosewood card), footer.
- **Sticky booking bar** appears once the hero CTA scrolls out of view; hidden on booking pages, status page and when the keyboard is open. Contents: "No account needed / Request your date", Messenger button, "Book now".

### 3.1 Step 1 — Service
- Radio cards: thumbnail, name, short description, `from ₱ [price] · [duration]`.
- Pre-selected when entered from a service/category link.
- Footer: "Selected: X" + "Continue to date". Continue disabled until a choice exists.
- Help link: "Not sure which one? Ask on Messenger".

### 3.2 Step 2 — Date
- Month calendar (Sun-first), prev/next month buttons; can't go before current month.
- Day states: available / unavailable / selected. **No other customers' details, names or counts are ever exposed.**
- Legend under grid. Fallback callout → Messenger.
- ⚠ B1/B3 decide what "unavailable" means.

### 3.3 Step 3 — Time
- Subtitle repeats date + "Times in Philippine time (PHT)". All times Asia/Manila, 12-hour format.
- Slot grid (sample values only). Pending-tone notice: "This is your **preferred** time… will confirm the final schedule."
- Loading: skeleton grid + "Checking availability…". Empty: "No open times on [date]" with "Pick another date" / Messenger.
- ⚠ B1 may replace this with a different control entirely.

### 3.4 Step 4 — Your details
Fields (in order):

| Field | Required | Input | Validation |
|---|---|---|---|
| Full name | Yes | `autocomplete="name"` | 2–80 chars |
| Mobile number | Yes | `+63` prefix, `type="tel"`, `inputmode="numeric"` | Accept `9XX XXX XXXX`, also normalise pasted `09XXXXXXXXX` / `+639…`; must be 10 digits after +63, starting with 9. Error: "Enter a 10-digit number after +63, e.g. 917 123 4567" |
| Best way to contact you | Yes | radio: Text/call, Messenger | — |
| Facebook name | If Messenger chosen | text | 2–80 chars |
| Email | No | `type="email"` | Format only if filled |
| Event location | Yes | text, hint "City or municipality, and venue if you know it" | 2–120 chars (⚠ B5 may make this structured) |
| Notes | No | textarea, counter /500 | ≤500 |

Validation behaviour: validate on blur and on submit; on submit failure show the error summary (links focus the field) and move focus to the summary. Preserve all input on error/back navigation.

### 3.5 Step 5 — Review
- Amber notice first: "This is a request, not a confirmed booking".
- Summary list with per-row "Edit" (returns to that step, then back to Review).
- "What happens next" (3 numbered lines).
- Checkbox: "I understand this request is not yet confirmed and agree to be contacted about it." (required)
- Turnstile slot. Button: **"Send booking request"** (never "Book now"/"Confirm").
- Sending state, failure alert ("We couldn't send your request… Try again / Use Messenger"). Guard against double submit.

### 3.6 Request submitted
- Paper-plane arch icon, "Request sent, [first name]!", "Your booking is **not confirmed yet**."
- Pending approval chip. Reference card (`BK-XXXX-XXXX`) with Copy (toast on success).
- Timeline: Requested ✓ → Pending approval (current) → Confirmed "Not yet — only after [Name] approves".
- Actions: Check my booking status, Message on Messenger, Back to home.

### 3.7 Booking status lookup
- Inputs: reference number + **last 4 digits of mobile** (both required, to prevent lookup by reference alone).
- Result card header by status (see §1.2); details list; optional artist note.
- Variants designed: Confirmed, Declined (with "Request another date"), Cancelled. Pending reuses the submitted timeline.
- No-match error is generic (doesn't reveal which field is wrong). Rate-limit friendly copy.

### 3.8 Shared UI states (artboard "Statuses & UI states")
Loading, empty, sending, failure, no-match, toast — specs as drawn.

---

## 4. Admin screens

Navigation: bottom tabs **Home · Requests (badge) · Calendar · Manage**. Manage → Services, Availability, Portfolio*, Settings* (*not yet designed). Requires auth (not designed here).

### 4.1 Overview
- Date + greeting; notifications button.
- Attention banner when pending > 0 ("3 booking requests waiting · oldest sent 2 days ago").
- Stat tiles: Today, Confirmed this week, Pending.
- Today list, Coming up list, Recent activity feed (source labelled: Website / Messenger / manual).
- FAB "New booking". Empty states: "No bookings today", "No requests waiting — you're all caught up".

### 4.2 Requests
- Search (name, number, reference). Filter chips by status with counts. Default: Pending, oldest first.
- Card: name, status chip, service · date · time, location · age, "New" marker, optional informational overlap note, quick **Decline | Approve** (open the sheets — never one-tap irreversible).

### 4.3 Booking details
- Reference, status chip, name, request time + source.
- Contact actions: Call (`tel:`), Text (`sms:`), Messenger.
- Detail list (service, date & preferred time, location, mobile, preferred contact, customer notes).
- Same-day context line (informational only — ⚠ B3).
- History timeline; secondary actions: Suggest a different date/time, Edit details. For Confirmed: Reschedule, Cancel booking.
- Sticky footer: Decline (outline red) | Approve (green).

### 4.4 Approve / Decline sheets
- **Approve:** summary, editable confirmed start time (pre-filled from request), optional note to customer, checkbox "Open Messenger afterwards with a ready-to-send confirmation message", buttons Not now | Approve. ⚠ B6 may add deposit fields later.
- **Decline:** reason radios (Fully booked that day / Not available at that time / Other), optional message, irreversible warning, Keep pending | Decline.
- Both: focus trap, Esc/scrim closes (except while saving), success toast + status updates in place.

### 4.5 Calendar
- Month / Week / Day segmented control; Today button.
- Month cell markers: confirmed dot, pending ring, blocked stripes + label, today outline, selected fill. Legend always visible.
- Selected-day agenda below grid; "Block this date". Cancelled shown struck through in agenda only.
- Week/Day views: not yet drawn (vertical time list per day — to design in Task 3).

### 4.6 Manual booking
- "Booked through": Messenger / Call-SMS / Walk-in / Other (required).
- Name (req), mobile (optional), service, date, start time, location, private notes (admin-only).
- Inline day check after date/time chosen (informational).
- Status: Confirmed (default) / Pending.

### 4.7 Services
- Reorderable list (drag handle + keyboard alternative: Move up/down in edit sheet), thumbnail, name, price · duration, Shown/Hidden switch.
- A service can't be shown without a price **or** "Ask for a quote" checked (validation shown).

### 4.8 Availability
- Working days (toggle + `[Start] – [End]` per day).
- Blocked date ranges with reason; remove button.
- "Booking rules — waiting on your decision" (B1, B2, B3) as "Not set" rows. Do not implement until confirmed.

---

## 5. Accessibility requirements (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1 (≥ 3:1 at 24px+); UI component boundaries ≥ 3:1. Verified pairs: plum/petal 12.73, mauve/petal 5.04, white/rosewood 6.51, rosewood/petal 6.16, input border/white 3.29.
- Sage `#7E8C76` is decorative only.
- Status never relies on colour alone (icon + text; calendar markers differ in shape).
- Touch targets ≥ 44×44.
- Semantic HTML: real `<button>`, `<a href>`, `<label for>`, `<fieldset>/<legend>` for radio groups, `<dl>` for detail lists, `<nav>` landmarks.
- Forms: visible labels (no placeholder-only), `aria-invalid`, `aria-describedby` for hints/errors, error summary with focus management, `autocomplete` attributes.
- Calendar: arrow-key navigation within grid, each day's `aria-label` includes date + state; month heading `aria-live="polite"`.
- Dialogs: `aria-modal`, labelled, focus trap, return focus to trigger.
- Live regions: toasts `role="status"`, errors `role="alert"`, loading `aria-busy`.
- Focus visible on everything; logical tab order; skip link on customer site.
- `prefers-reduced-motion` honoured. Page `lang="en"` (update if Filipino copy is added).
- Text resizes to 200% without loss; no horizontal scroll at 320px.

---

## 6. Responsive behaviour (rules — visuals pending Task 3)

| Breakpoint | Width | Customer | Admin |
|---|---|---|---|
| `sm` (base) | 320–767 (design at 375/390) | Single column, sticky bars, 16px gutter | Bottom tabs, full-screen detail, bottom sheets |
| `md` | 768–1023 | Booking steps centred max 560px; portfolio 3-col; hero 2-col larger | Bottom tabs → left icon rail; requests list + detail side by side; sheets become centred dialogs (max 480) |
| `lg` | ≥1024 (design at 1440) | Content max 1200px; booking = steps left (max 640) + sticky summary card right (320); sticky mobile CTA replaced by header "Book now" | Left sidebar with labels (240px); overview as 3-col grid; calendar month large + agenda panel right; tables allowed for lists |

Rules: hero display type scales 38 → 48 → 64px; never hide the booking CTA at any width; calendar cells stay ≥ 44px.

---

## 7. Performance notes (design-side)

- 2 font families, ≤ 5 weight files, `display=swap`, preconnect to Google Fonts (or self-host via R2).
- Images: AVIF/WebP, responsive `srcset`, lazy-load below the fold, placeholder bg = `color.photo-*` (blurred LQIP optional), fixed aspect ratios to prevent layout shift.
- Hero image ≤ ~120 KB on mobile. Portfolio thumbnails ≤ ~40 KB.
- No carousels auto-playing; no heavy animation libraries required.

---

## 8. Copy rules

- Never say "booked", "confirmed" or "reserved" before owner approval. Use "request", "requested", "pending approval".
- Times always show PHT context on selection screens; 12-hour clock; dates "Sat, 21 Nov 2026".
- Currency: `₱` prefix, thousands separator (`₱ 3,500`). Prices only from admin settings.
- Phone display: `+63 917 123 4567`.
- Reference format (proposed): `BK-XXXX-XXXX` (uppercase, no ambiguous characters 0/O/1/I).

---

## 9. Not yet designed

~~Services page (full), Portfolio page + admin portfolio manager, Settings,~~ ~~admin Week/Day calendar views~~ (Step 3, in review), tablet/desktop artboards, admin login screen. ~~Notification preferences~~ (done in Phase 2 · Step 2).

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1 | 12 Oct 2026 | Initial draft: customer booking flow + admin dashboard (mobile) |
| 0.2 | 12 Oct 2026 | Phase 2 Step 1 approved — Services & Portfolio pages (§10) |
| 0.3 | 12 Oct 2026 | Step 1 refinements R1–R3 (§11); Step 2 Admin Portfolio & Settings (§12–13) |
| 0.4 | 12 Oct 2026 | Step 2 approved; refinements S2-R1–R3 applied to §12.2, §12.1, §13.4 and summarised in §14; Step 3 Week & Day calendar (§15) — **in review** |

---

## 10. Public Services & Portfolio (Phase 2 · Step 1 — APPROVED)

Canvas page: *Services & Portfolio* — S1, S2, P1, P2, P3.

### 10.1 Services page (S1)
- Header: eyebrow, H1, artist-written intro. Category jump chips (anchor links, `aria-current`).
- One card per **shown** service, in admin order: arch-bottom cover, category eyebrow, H2 name, description, price tile + duration tile, "Recent work" (3 arch thumbnails from matching portfolio category, opens viewer), actions.
- Closing Messenger band + footnote "Prices shown are starting rates. Your final quote is confirmed by [Name]…". Sticky booking bar as Home.

### 10.2 Service card states (S2)

| State | Price tile | Primary action | Secondary | Notes |
|---|---|---|---|---|
| Price — starting | "Starting at ₱ [price]" | Request booking | Messenger icon | |
| Price — range | "₱ [min] – ₱ [max]" | Request booking | Messenger icon | |
| Ask for a quote | "Ask for a quote" (no ₱, no number) | Request booking | "Ask for a quote" (Messenger) | See R2 |
| Temporarily unavailable | hidden | — | "Ask about future dates" (Messenger) | Dashed border, grey status chip; excluded from booking step 1 |
| No portfolio photos | — | as above | — | "Recent work" row omitted; cover falls back to blush arch + name |

Page states: loading (skeleton cards), failed to load (alert + Try again / Use Messenger), **no services configured** (empty state; booking CTAs hidden site-wide; Messenger becomes primary).

### 10.3 Portfolio page (P1)
- Category filter tabs (`role="tablist"`); categories with 0 photos are hidden.
- One featured photo in full-width arch (380px tall, "Featured · [Category]" label); grid = 2 columns, 4:5, radius 14, optional caption under tile.
- Pagination via "Load more" (shows "Showing X of N"); no infinite scroll.
- "Love a look?" booking band → booking with preselection (R3).

### 10.4 Viewer (P2)
- Full-screen dialog, dark ground `#1C1417`, counter (`aria-live`), close 48px, prev/next 48px, swipe + arrow keys + Esc.
- Image `object-fit: contain`, never cropped. Category chip, optional caption, CTA "Request a [category] booking".
- Focus trapped; focus returns to the tile that opened it.

### 10.5 Portfolio states (P3)
Empty category, whole portfolio empty (page hidden from nav-linked sections, homepage "Recent work" removed), loading (reserved 4:5 boxes, dominant-colour/blurred preview → fade-in; no fade under reduced motion), image unavailable (tile + viewer variants with Try again / Next), load-more failed.

### 10.6 Captions & identity
Captions optional and artist-written. No client names by default. Admin hint warns against naming clients without consent.

---

## 11. Step 1 refinements (R1–R3)

Canvas: *Admin · Portfolio & Settings* → artboard **R · Step 1 refinements**. Previously approved screens are unchanged; these are variants/rules layered on top.

### R1 — Not ready for online bookings
- **Public site:** if no service is shown *or* online booking is switched off → all "Request booking / Book now" actions are hidden (header, sticky bar, cards, viewer, bands). Messenger is the primary CTA. Booking URLs show a friendly "Online booking isn't open yet — message [Name]" page instead of the flow.
- **Admin home:** the "requests waiting" banner is replaced by an amber **"Online booking is off"** card with a setup checklist + progress (e.g. "2 of 4 done") and "Finish setup".
- **Setup checklist (proposed):** Business profile · Working days · ≥1 service shown with a price **or** "Ask for a quote" · Turn on online booking. *(Checklist items are a design proposal — confirm with owner.)*
- **Manage hub (T1):** "Online booking" switch with status pill. Switch is disabled (`aria-disabled`, explained by `aria-describedby`) until required items are done; can always be switched off.

### R2 — Quote-based pricing
- Customer flow never renders "₱", "from" or a number for a quote service: step 1 card shows **"Price on request"**; sticky summary shows service name only.
- **Review step** service row adds an amber info line: **"Price to be confirmed by the makeup artist."**
- **Submitted page & status lookup:** detail row "Price — To be confirmed by the makeup artist".
- **Admin:** request card/detail shows a **"Quote needed"** chip; approve sheet adds reminder text "This customer hasn't been given a price yet…". No price-capture field is added (pricing/deposit capture unconfirmed).

### R3 — Service preselection
| Entry point | Result in booking step 1 |
|---|---|
| Service card "Request booking" | That service selected; green status line "[Service] selected from Services · Change"; focus on Continue |
| Portfolio photo/viewer/band, category maps to exactly 1 bookable service | That service selected |
| Category maps to 2+ bookable services | Nothing selected; matching services listed first |
| No mapping, or service hidden/unavailable | Nothing selected; hint "Choose a service to continue" |

Mapping is set per category in Admin › Portfolio › Categories ("Books as: [service] / choose manually"). Preselection must survive Back navigation and page refresh within the session.

---

## 12. Admin Portfolio management (Phase 2 · Step 2 — APPROVED, refined in v0.4)

Canvas: *Admin · Portfolio & Settings* → M1–M5. Entry: Manage › Portfolio.

### 12.1 Overview (M1)
- Header with **Upload** primary button.
- Usage meter "48 of [limit] photos used" (`role="progressbar"`) + "View site" link. ⚠ Limit unconfirmed.
- ~~Upload tray on overview~~ — removed in v0.4 (uploads only exist while the upload screen is open; see §14).
- Category filter chips with counts + "Manage" link → categories.
- **Featured** row: up to [n] arch thumbnails with star badge ("Shown first on your site"). ⚠ [n] unconfirmed.
- All photos: 3-col square grid, category label + star badge; actions **Reorder** and **Select** (multi-select for bulk category change / remove).

### 12.2 Upload (M2)
- Dashed picker (native multi-file input) with constraints line: "JPEG, PNG or WebP · up to 10 MB each · [n] photos left". ⚠ **Proposed technical constraints, pending implementation validation** (see §14).
- Batch category select (required) — per-photo edits afterwards.
- Per-file row states:

| State | Visual | Actions |
|---|---|---|
| Uploading | thumbnail 70% opacity + progress bar (`role="progressbar"`, %) | Cancel (X) |
| Uploaded | green "Uploaded" | Edit |
| Failed (network) | red border, "Upload failed — connection lost." | Retry |
| Unsupported format | file icon, "This file type isn't supported." + "HEIC isn't supported yet. Use JPEG, PNG or WebP — on iPhone, Settings › Camera › Formats › Most Compatible." | Remove from list |
| Too large | file icon, "File too large (18 MB). The limit is 10 MB." + tip | Remove from list |
| Interrupted (v0.4) | see §14 / artboard M6 | Choose photos again |

- Live summary (`aria-live`): "1 done · 1 uploading · 3 need attention".
- Footer (v0.4): amber status "Keep this screen open until all uploads finish." Done button disabled while any file is uploading ("Done — 1 photo still uploading").
- Client-side checks (type/size/count) run **before** upload; server remains authoritative.

### 12.3 Photo details & remove (M3)
- Preview with toggle **Grid preview / Featured arch** (shows the 4:5 vs arch crop).
- Category (select), Caption (optional, 120 chars, consent hint), Featured switch ("3 of [n] featured slots used"), Position (**Move earlier / Move later** — keyboard/a11y alternative to drag), Remove photo (text button, destructive colour).
- Sticky save bar shows "Unsaved changes"; leaving with unsaved changes prompts.
- **Remove confirmation**: `role="alertdialog"` bottom sheet with thumbnail, "This can't be undone.", contextual warning if photo is a featured item or service cover, buttons **Keep photo** (default focus) / **Remove** (red).

### 12.4 Reorder & categories (M4)
- Reorder mode: Cancel / Save header; rows with drag handle, thumbnail, position, ↑/↓ buttons (44px); lifted row = 2px rosewood border + shadow; status message announces new position. Featured photos always render first on the public site regardless of order.
- Categories: rows with name · count, "Books as: [service]" mapping (R3), edit; zero-photo categories marked "Hidden on site — no photos yet". Add-category inline input.
- Delete category with photos: requires choosing a destination category ("photos are not deleted"); red **Delete category**.

### 12.5 Empty, limit & error states (M5)
Empty portfolio (explains public sections are hidden + upload CTA + tips: own work, client consent, portrait orientation), limit almost reached (amber meter), limit reached (alert + disabled upload), featured slots full (disabled switch + reason), save failed (edits kept + Retry), success toasts.

---

## 13. Admin Settings (Phase 2 · Step 2 — APPROVED, refined in v0.4)

Canvas: T1–T4. The **Manage** tab is the hub.

### 13.1 Manage hub (T1)
1. **Online booking** card — switch + status pill + checklist link (R1).
2. *Your website*: Services · Portfolio · Availability (existing screens).
3. *Settings*: Business profile · Contact & social · Booking preferences (grey "6 not set" badge) · Notifications.
4. *Account*: avatar + "Account & sign out".

### 13.2 Business profile, contact & social (T2)
Single scrolling form in fieldsets (one Save):

| Group | Field | Req. | Notes |
|---|---|---|---|
| Images | Profile photo | Yes | Arch crop; used on About/hero |
| | Logo | No | If absent, business name rendered in DM Serif |
| About | Business name | Yes | |
| | Makeup artist name | Yes | |
| | Short bio | No | 300 chars; homepage "Hi, I'm…" |
| Contact | Contact number | Yes | +63 format as booking form |
| | Business email | No | |
| | Business location | Yes | City/area only — no home address; shown publicly |
| Social | Facebook page | No | URL |
| | Messenger link | Yes* | Must be an `m.me/…` link; powers every Messenger button; "Test link". *Required for Messenger CTAs to render |
| | Instagram | No | `@` prefix field |
| | Other links | No | Repeatable label + URL, removable |

Save bar summarises validation ("1 field needs fixing").

### 13.3 Booking preferences (T3)
- Banner: "Nothing here is pre-filled. Anything you leave blank is simply not shown to customers."
- Every field starts **empty** with a grey **Not set** chip and a "Shown on: …" line.

| Field | Control | Shown to customers on |
|---|---|---|
| Booking instructions | textarea | Review step |
| Minimum booking notice | number + unit | ⚠ "Needs scheduling decision" — enforcement TBD |
| How far ahead customers can request | number + unit | ⚠ "Needs scheduling decision" |
| Cancellation policy | textarea (owner's own words) | Review step, Status page |
| Rescheduling policy | textarea | Review step, Status page |
| After-request instructions | textarea | Request submitted page (falls back to standard "What happens next") |

- "Preview what customers see" link. No default policy text anywhere.

### 13.4 Notifications (T4 left — revised v0.4)
- "Alert me about": New booking requests · Cancellations · Booking changes · Upcoming appointments (reminder timing: not set) — switches. These control **in-app** alerts only.
- **1 · In-app notifications** (proposed MVP): "Dashboard alerts — Badges, home banner & activity feed" · status **On**.
- **2 · External messages** (not built): grey banner "Not built yet. No texts, emails or Messenger messages are sent automatically — to you or to customers. You contact customers yourself." Rows SMS / Email / Messenger marked **Not available**, dashed container, `aria-disabled`.
- Copy rule: nowhere in admin or customer UI may imply automatic external delivery (e.g. avoid "We'll text you", "You'll get an email").

### 13.5 Account (T4 right)
- Avatar, role "Owner · Administrator", Display name (dashboard only).
- Sign-in identifier read-only with note: options depend on the login method (not yet chosen).
- **Sign out** (outline button) with explanation; confirmation screen designed in Step 4.
- Footer: "One administrator account. Team members aren't supported yet."

### 13.6 Step 2 open questions
1. Photo limit, max file size, accepted formats (HEIC support?).
2. Number of featured photos.
3. Should hidden/unavailable services keep their portfolio category visible?
4. Setup checklist items for "Online booking" (R1) — confirm required set.
5. Notification channels and reminder timing.
6. Login method → determines Account › Sign-in section.
7. Is a public business email/phone acceptable to show, or Messenger only?

---

## 14. Step 2 refinements (v0.4)

### S2-R1 — Upload behaviour (no background / resumable uploads)
- Uploads run **only while the upload screen is open**. No promise of background continuation anywhere.
- Upload screen footer: "Keep this screen open until all uploads finish."; Done disabled while uploading.
- **Leave guard** (artboard M6, left): `role="alertdialog"` bottom sheet "Leave while uploading?" listing in-progress files with %, buttons **Stay** (primary, default focus) / **Leave anyway**. The browser's native leave/refresh warning is also triggered while uploads are active.
- **Interrupted state** (M6, right): amber alert "Upload interrupted — The connection dropped or the screen was closed. 3 photos uploaded; 2 didn't finish and weren't saved." Per-file list: Uploaded / "Not uploaded — stopped at 64%". Copy: "Partial uploads can't be continued. Choose these photos again to start over." Actions: **Choose photos again**, Back to portfolio.
- Overview upload tray removed.

### S2-R2 — Image constraints (PROPOSED — pending implementation validation)
| Constraint | Proposed value |
|---|---|
| Accepted formats | JPEG, PNG, WebP |
| Max size per original | 10 MB |
| HEIC | Deferred — rejected with guidance |
| Optimisation | Planned (resized/compressed derivatives for the public site) — not designed as a user-visible step |
| Portfolio limit | Configurable — UI shows `[limit]` |

### S2-R3 — Notifications
In-app dashboard notifications = proposed MVP. External SMS / email / Messenger = not implemented; customers and admin receive **no** automatic external messages. See §13.4.

---

## 15. Admin calendar — Week & Day views (Phase 2 · Step 3 — IN REVIEW)

Canvas page: *Admin · Week & Day calendar* — W1, D1, CS. Month view (A5) unchanged. All three views share the header (title + **Today**), the Month / Week / Day segmented control (`role="tablist"`) and the bottom tab bar.

> All appointment data is illustrative. End times are shown as "~ (est.)" because service durations are unconfirmed. Overlap notices are informational only — the calendar does not prevent, hold, or auto-resolve anything.

### 15.1 Week view (W1)
- **Week selector card:** prev/next week buttons (44px), range label "12 – 18 Oct 2026" (`aria-live="polite"`), and a 7-day strip (`role="tablist"`). No seven-column appointment grid on mobile.
- **Day cell** (≈46×76px, full cell is the touch target): weekday, date, marker row. Markers differ by **shape**: confirmed = filled dot, pending = hollow ring, blocked time = striped bar. Max 3 markers, then "+n". Selected = rosewood fill; today is named in the agenda heading ("Mon, 12 Oct · Today"). Each cell's `aria-label` spells out counts ("Sun 18 October, 1 confirmed, 1 pending request").
- Legend under the strip (always visible).
- **Week summary chips:** "4 confirmed · 1 pending · 1 blocked period" (text + colour).
- **Attention line** (only when relevant): "Sun 18: a pending request overlaps a confirmed booking. For your information only. › View".
- **Selected-day agenda:** heading + "Open day view". Items in time order:
  - Appointment card: time + "to ~h:mm (est.)", name, service · location, status chip (icon + text), 6px status-coloured left edge.
  - **Selected appointment** expands in place (2px plum outline): reference, phone, source, Call / Messenger icon buttons, **Open booking**.
  - Gaps: dashed "7:00 AM – 2:00 PM · nothing booked  + Add booking" (opens manual booking prefilled with date/time). This is descriptive, not an availability rule.
- FAB (round "+") → manual booking.

### 15.2 Day view (D1)
- Date nav: prev/next day (44px), "Sunday, 18 October" + summary "1 confirmed · 1 pending · 1 blocked" (`aria-live`).
- Informational overlap note (`role="note"`) when two items overlap.
- "Show 1 cancelled booking" toggle — cancelled hidden by default, shown struck through when revealed.
- **Timeline:** hour labels 4 AM–6 PM (range = earliest/latest of working hours and items), 56px per hour.
  - Outside working hours: light hatched band labelled "Outside working hours" (from Availability › Working days).
  - Confirmed: green tint, 5px green left border, ✓ "Confirmed".
  - Pending: amber tint, **2px dashed** amber border, clock "Pending". Never shown as holding time.
  - Overlapping items split into side-by-side lanes (≥140px each); never stacked invisibly.
  - Blocked period: grey hatched, ⊘ "Blocked · 12:00 – 1:00 PM · Personal" → edit block.
  - Empty spans within working hours: dashed "Nothing booked  + Add" → manual booking prefilled.
- Tapping an item opens the **selected appointment sheet** (CS) rather than navigating away; sheet has Call, **Open booking**, Close.
- Extended FAB "New booking".
- Keyboard: items are links in time order; ←/→ change day; T = today (optional).

### 15.3 Interaction states (CS)
| State | Treatment |
|---|---|
| Loading | Skeleton week strip + agenda cards, `aria-busy`, "Loading bookings…" |
| Empty day/week | Arch calendar icon, "Nothing booked on Tue, 13 Oct", **Add booking** / **Block time** |
| Failed to load | Error alert "Couldn't load your calendar" + "Don't rely on an empty calendar until it loads." + Try again |
| Selected appointment | Bottom sheet (`role="dialog"`), status chip, name, service/date/time, location/phone, Call / Open booking / Close |
| Pending booking conflict | Pending card (dashed) + note "Overlaps: Maria Santos, confirmed 6:00 AM. The app doesn't prevent or resolve overlaps — approve, decline or suggest another time." Actions: Suggest time / Open request |
| Blocked date (all day) | Full-width hatched card "Blocked all day · Family event · Edit" + "Blocking a date doesn't change existing bookings or requests — review those yourself." |
| Multiple appointments | Week cell: 3 markers + "+1"; agenda lists all with ✓ / ◷ / ⊘ text labels; cancelled struck through |

### 15.4 Accessibility notes (calendar)
- All controls ≥ 44px; day cells 46×76.
- Status = icon + text + colour + shape (dot / ring / stripes / dashed border).
- Every appointment has an `aria-label` with time, name, service, status and overlap info.
- Week strip and view switcher use tab semantics with arrow-key movement; focus ring 2px plum.
- Hour grid lines are `aria-hidden`; timeline content order = chronological DOM order.

### 15.5 Step 3 open questions
1. Real service durations (needed to draw true end times).
2. Should cancelled bookings appear in Week view at all, or only in Day view on demand?
3. Should blocked *time ranges* (not just whole days) be supported? Designed as supported.
4. Default calendar view when opening the tab (proposed: Week).
5. Earliest/latest hours to display if working hours aren't set.

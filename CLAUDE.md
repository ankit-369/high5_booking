# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (http://localhost:3000)
pnpm build      # Production build
pnpm start      # Run production build
pnpm lint       # ESLint via next lint

# Add a shadcn component
pnpm dlx shadcn@latest add <component-name>
```

No test suite is configured.

## Architecture

**Next.js 14 App Router** — all routes live under `app/`. Server components are the default; add `"use client"` only when state, effects, or browser APIs are needed.

### Data layer

All data is **mock-only** — no database, no API calls. The single source of truth lives in `lib/mockData.ts`:

- `mockCoaches` — 3 coaches (c1–c3)
- `mockSlots` — 24 slots across 3 coaches and 3 dates, each with a `breakdown` object keyed by session type (`trial`, `consultation`, `physio`, `goalSetting`, `assessment`) holding `{ total, booked }`
- `mockBookings` — 6 sample bookings
- `mockClients` — 4 members (used for the member login flow)

Types are in `lib/types.ts`. Constants (brand colours, `SESSION_LABELS`, `SESSION_COLORS`) are in `lib/constants.ts`.

**State that needs to survive across interactions is lifted to the page level** (e.g. the slot list in `/app/coach/page.tsx` starts from `mockSlots` but is managed via `useState`).

### Key shared components

| Component | What it does |
|---|---|
| `components/shared/Navbar.tsx` | Sticky dark-blue nav; client component for mobile menu |
| `components/shared/OtpModal.tsx` | Phone → 4-digit OTP flow; `onVerified(phone: string)` fires with `"+91" + digits`; any 4-digit code passes (mock) |
| `components/shared/PageWrapper.tsx` | Gradient background + centred white card; accepts `maxWidth`, `cardClassName`, `className` |
| `components/booking/BookingForm.tsx` | 3-step form (Personal Info → Coach/Slot → Confirm); accepts `sessionType: SessionType` and optional `prefillData?: Client` |

### Booking flow

**Public sessions** (`/book/trial`, `/book/consultation`, `/book/physio`):
- Page is a server component that renders `<Navbar>` + `<BookingForm sessionType="...">`.
- Step 1 collects personal info, triggers `OtpModal` for phone verification, then advances to step 2.

**Member-only sessions** (`/book/goal-setting`, `/book/assessment`):
- Pages are server components that read `searchParams.phone`, look up the client in `mockClients`, and pass `prefillData` to `BookingForm`.
- When `prefillData` is set, `BookingForm` skips step 1, initialises form state from the client, and shows a read-only member info card with an "Edit" link back to `/member`.

**Member login** (`/member`):
- Client component; opens `OtpModal` automatically on mount.
- After verification, looks up `mockClients` by raw phone (strips `"+91"`). Shows dashboard with two booking cards that navigate to `/book/goal-setting?phone=<phone>` or `/book/assessment?phone=<phone>`.

**Landing page** (`/`):
- "Already A Member" → opens `OtpModal`, navigates to `/member`.
- Members-only programme cards → opens `OtpModal`, navigates to `/book/goal-setting?phone=<phone>` (phone appended after verification).

### Slot availability logic

`BookingForm` maps `SessionType` → `keyof SlotBreakdown` via:
```ts
const BREAKDOWN_KEY: Record<SessionType, keyof SlotBreakdown> = {
  "trial": "trial", "consultation": "consultation", "physio": "physio",
  "goal-setting": "goalSetting", "assessment": "assessment",
};
```
Available spots = `slot.breakdown[bKey].total - slot.breakdown[bKey].booked`. Slots with `status: "blocked"` are filtered out.

### Styling conventions

- **No CSS modules or styled-components** — Tailwind utility classes only.
- Brand colours are available as Tailwind tokens (`bg-primary`, `text-accent`) and as hex values in `lib/constants.ts` (`BRAND_COLORS`).
- The `cn()` helper (`lib/utils.ts`) merges class strings: `cn(base, conditional)`.
- Inline `style={{ backgroundColor: "#1E3A8A" }}` is used in places where Tailwind's JIT doesn't pick up dynamic values.
- Card pattern: `bg-white rounded-2xl shadow-md p-6 sm:p-8`.
- Input pattern: `px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#1E3A8A] focus:bg-white transition-colors`.

### `"goal-setting"` key quirk

The session type string is `"goal-setting"` (hyphenated) but the `SlotBreakdown` key is `goalSetting` (camelCase). Always use `BREAKDOWN_KEY` to translate between them rather than hand-rolling the mapping.

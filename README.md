# high5-booking

Fitness coaching & session booking platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS v3, and shadcn/ui.

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 14 (App Router) |
| TypeScript | ^5 |
| Tailwind CSS | ^3.4 |
| shadcn/ui | latest |
| Font | Geist (next/font/google) |
| Package manager | pnpm |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Run

```bash
pnpm build
pnpm start
```

## Linting

```bash
pnpm lint
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/book/trial` | Book a trial session |
| `/book/consultation` | Book a consultation |
| `/book/physio` | Book a physio session |
| `/book/goal-setting` | Book a goal-setting session |
| `/book/assessment` | Book an assessment |
| `/member` | Member login (OTP) |
| `/coach` | Coach dashboard |
| `/admin` | Super admin |

## Project Structure

```
high5-booking/
├── app/
│   ├── layout.tsx          # Root layout with Geist font
│   ├── globals.css         # Tailwind base + CSS variables
│   ├── page.tsx            # Landing
│   ├── book/
│   │   ├── trial/
│   │   ├── consultation/
│   │   ├── physio/
│   │   ├── goal-setting/
│   │   └── assessment/
│   ├── member/
│   ├── coach/
│   └── admin/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── shared/             # Navbar, OtpModal, …
│   ├── booking/            # Booking-specific components
│   └── coach/              # Coach-specific components
└── lib/
    ├── constants.ts        # Brand colors, session types
    ├── types.ts            # TypeScript interfaces
    ├── mockData.ts         # Mock coaches, slots, bookings
    └── utils.ts            # shadcn cn() utility
```

## Brand Colors

```
primary  #1E3A8A  — dark blue
accent   #7AC143  — green
danger   #EF4444
warning  #F97316
muted    #6B7280
```

Use them in Tailwind: `bg-primary`, `text-accent`, `border-danger`, etc.  
Arbitrary values also work: `mb-[3rem]`, `text-[#1a1a1a]`.

## Swapping the Font

In `app/layout.tsx`, replace the `Geist` import with any other `next/font/google` font and keep `variable: "--font-sans"` — Tailwind's `font-sans` will pick it up automatically.

## Adding shadcn Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

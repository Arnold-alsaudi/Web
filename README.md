# Iron District — Gym Management SaaS (Demo)

A front-end demo of a gym management product for gyms in Egypt. You show it to a gym owner to present
the product experience: memberships, attendance, trainers, member profiles and a member app.

> **Demo only.** No backend, database, login, payments or messaging. Every name, number, date and price
> is invented and lives in `lib/mockData.ts`. The UI labels demo data with **DEMO DATA** tags.

## Stack
Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Lucide icons. Fonts are Manrope (headings) and
Inter (text).

## Run
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy
```bash
npm run build      # static export in ./out
```
The `out/` folder is plain HTML/CSS/JS. Upload its contents to any static host, for example cPanel
`public_html`, Netlify, Vercel or GitHub Pages. No Node server is needed.

## Pages
- `/`: the demo, covering the hero, dashboard preview, features, membership plans, trainers, check-in
  experience, member profile, member app preview, CTA and footer
- `/design-system/`: tokens and components (color, type, spacing, buttons, inputs, badges, cards,
  table, empty state, modal)

## Structure
```
app/
  globals.css            design tokens (@theme) and base styles
  layout.tsx, page.tsx   fonts, metadata, section order
  design-system/         design system reference page
components/
  ui/                    primitives: button, badge, field, modal, avatar, empty-state, reveal...
  navbar, hero, dashboard-preview, stats-card, attendance-chart, membership-mix,
  feature-card, features, membership-card, membership, trainer-card, trainers,
  attendance-preview, member-profile, mobile-preview, qr-pattern, cta, footer
  demo-provider.tsx      "Book a Demo" and plan-details modals, opened from anywhere
lib/
  types.ts               domain types (Member, Plan, Trainer, Stat...)
  mockData.ts            all demo data
  utils.ts               formatting and lookups
```

## Interactive parts
- **Book a Demo** opens a validated form. On submit it shows a success state; nothing is sent.
- **View Plan** opens the plan details.
- **Member Check-in**: search by name or ID (try "Ibrahim" for an expired membership, or "zzz" for the
  empty state), simulate a QR scan, and confirm a check-in.

## Turning it into a real product later
Components read data only through `lib/mockData.ts` and the types in `lib/types.ts`. To connect a backend,
replace those imports with API calls that return the same types, and add auth and persistence behind them.

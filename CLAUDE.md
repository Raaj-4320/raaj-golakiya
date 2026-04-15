# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Static export to /out/ (next build with output: 'export')
npm run lint       # ESLint
```

There are no tests. The build is the primary validation — always run `npm run build` after changes to confirm no TypeScript errors.

## Architecture

**Stack:** Next.js 14 (App Router, static export), TypeScript, Tailwind CSS, Framer Motion, Lucide React.

**Entry point:** `src/app/page.tsx` renders all 10 sections in order: `Navbar → Hero → About → Skills → Projects → Experience → Education → ServicesPlayground → Contact → Footer`.

**Static export:** `next.config.mjs` sets `output: 'export'`. No server-side features (no API routes, no SSR). All components are `'use client'`.

**Styling system** (`src/app/globals.css` + `tailwind.config.ts`):
- Custom navy color palette (`navy-950` through `navy-600`) used as the dark background scale
- Utility classes: `.glass` (glassmorphism), `.glass-hover`, `.gradient-text`, `.gradient-text-blue`, `.hero-gradient`, `.grid-bg`, `.section-label`, `.cursor` (blinking typewriter cursor)
- Custom Tailwind animations: `float`, `float-delayed`, `float-slow`, `ping-slow`, `spin-slow`, `glow-pulse`
- Custom shadows: `glow-blue`, `glow-violet`, `glow-cyan`, `glow-sm`

**Component patterns:**
- All data (projects, skills, experience, etc.) is defined as constants at the top of each component file — there is no external data layer or CMS.
- Scroll-triggered animations use `useInView` from Framer Motion with `{ once: true }`.
- Section IDs used for navbar scroll-spy: `#about`, `#skills`, `#projects`, `#experience`, `#services`, `#contact`.

**ServicesPlayground** (`src/components/ServicesPlayground.tsx`) is the most complex component — a 4-phase interactive state machine:
- Phase `'explore'`: grid of 6 `ServiceOrb` cards
- Phase `1`: service re-selection
- Phase `2`: feature checkbox selection
- Phase `3`: `JourneyMap` visualization (animated 5-node pipeline)
- Phase `4`: budget (CAD) + timeline estimate with CTA to `#contact`
- Budget/timeline are derived from `calcBudget(service, featureCount)` and `calcWeeks(service, featureCount)`
- `AnimatePresence mode="wait"` with `pageVariants` handles phase transitions

**Resume:** Expected at `public/resume.pdf` — the Navbar and Hero link to `/resume.pdf` for download. This file is not included in the repo.

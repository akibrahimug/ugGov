# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **pitch prototype** for `ug.gov` — a unified online home for the Government of Uganda, inspired by gov.uk. The repo is simultaneously the clickable demo used to sell the idea AND the production foundation if the pitch is greenlit; treat it as real code, not throwaway. Pitch narrative lives in `docs/pitch/`.

## Common commands

```bash
pnpm install                   # bootstrap (pnpm 10+ required, Node 20.19+)
pnpm dev:frontend              # Next.js on http://localhost:3000
pnpm dev:studio                # Sanity Studio — needs SANITY_STUDIO_PROJECT_ID in apps/studio/.env
pnpm dev                       # runs all dev servers via Turborepo

pnpm -F @ug-gov/frontend build # build a single workspace
pnpm build                     # build everything
pnpm typecheck                 # tsc --noEmit across workspaces
pnpm lint                      # biome check
pnpm lint:fix                  # biome check --write
```

Single-workspace scripts: `pnpm -F <package-name> <script>`. Examples:

```bash
pnpm -F @ug-gov/frontend dev
pnpm -F @ug-gov/studio deploy
```

There is no test runner wired yet — `pnpm test` is a no-op. CONTRIBUTING.md references axe-core checks but they haven't been implemented.

## Workspace shape

- **`apps/frontend`** — Next.js 15 App Router. The only public surface.
- **`apps/studio`** — Sanity Studio. Not connected to a live project; runs locally against any Sanity project ID.
- **`packages/ui-tokens`** — design tokens as CSS custom properties + TypeScript constants. Flag palette only (black / flag-yellow / flag-red — no blues or greens). Exports `tokens.css` and `reset.css`.
- **`packages/frontend-components`** — React components. One folder per component with `.tsx` + `.css`; `src/styles.css` aggregates the imports; `src/index.ts` re-exports everything. All interactive elements (buttons, nav links, drawer items, mega-menu links, payment-method cards, parish-list items) share one universal hover — `background: black; color: flag-yellow` — this is load-bearing and must not be broken variant-by-variant.
- **`packages/content-schemas`** — Sanity schemas + matching Zod + TypeScript types in one place. When adding a new document type, add the Sanity schema, register it in `sanity/index.ts`, and add the Zod + TS mirror in `types/index.ts`.
- **`packages/seed-content`** — TypeScript fixtures (organisations, programmes, services, guides, news, publications, people). Shape mirrors the Sanity schemas so migration to a real Sanity dataset is a one-place change.

Never cross-depend between `apps/*`. Lift shared code into a package.

## Content-access architecture

All content flows through **`apps/frontend/src/lib/content.ts`**. Server components and `generateStaticParams` read from it; client components must NOT import it directly (`seed-content` has transitive imports that can drag Node-only modules into the client bundle — happened once with `node:crypto`, fixed globally, but don't regress).

**Rule**: server page reads data from `lib/content.ts`, passes the minimal shape needed to its client child components as props. See `apps/frontend/src/app/contact/page.tsx` → `ContactForm.tsx` for the canonical pattern.

When Sanity is live, only `lib/content.ts` changes (swap seed imports for a Sanity client). The rest of the app stays put.

## Apply-wizard system

The service application flow is the most complex piece. A lot is happening in a small amount of code — read these together:

- **`apps/frontend/src/app/services/[slug]/apply/applyConfig.ts`** — `APPLY_CONFIGS` is a keyed record: slug → `ApplyConfig` (title, intro, fieldsets[], optional `payment`, success copy, next-steps). Fields can specify `row: 'key'` to render side-by-side at ≥640px.
- **`apps/frontend/src/app/services/[slug]/apply/ApplyForm.tsx`** — client wizard. Fieldsets are all rendered with `[hidden]` on inactive ones (uncontrolled inputs preserve values across step changes). `totalSteps = fieldsets.length + (payment ? 1 : 0)`; the payment step is separate from `config.fieldsets`.
- **`apps/frontend/src/app/services/[slug]/apply/PaymentStep.tsx`** — payment step with MTN MoMo / Airtel Money / Visa-Mastercard / URA PRN methods. Exports its own `validatePaymentStep()`.
- **`apps/frontend/src/lib/validation.ts`** — field-kind validators (`text`, `email`, `tel`, `url`, `date`, `nin`, `select`, `textarea`). Ugandan phone accepts `+256…`, `256…`, `0…` with or without spaces/dashes after normalisation.
- **`apps/frontend/src/components/ErrorSummary.tsx`** — gov.uk-style error summary. `forwardRef`-enabled so the form can focus it after a failed submit.

On Continue: validate the current step only (fieldset rules OR `validatePaymentStep`). On final Submit: validate everything; if errors, jump to earliest step with an error. On clean submit: flash a 1.4 s processing screen, then the success view.

## Find-a-parish + Leaflet

`/find-a-parish` demonstrates a map-based browse. Leaflet is the one runtime-browser-only dependency in the app.

- **`src/lib/parishes.ts`** — ~20 sample parishes across all four regions with lat/lng + SACCO status.
- **`src/components/ParishMap.tsx`** — pure `'use client'` component using Leaflet directly (NOT `react-leaflet`). Leaflet is imported via `import('leaflet')` inside `useEffect` so it's never touched at SSR.
- **`src/components/FindParishView.tsx`** — client wrapper. Uses `next/dynamic` with `ssr: false` to gate `ParishMap`. This pattern (`dynamic({ssr:false})` from inside a client component) is the workaround for Next.js App Router not allowing `ssr:false` in server components.

Markers are `L.divIcon`s styled via CSS (`.uggov-parish-marker`) so we can use flag colours instead of Leaflet's default PNG markers — no image-asset plumbing needed.

## Header + mega-menu

`packages/frontend-components/src/components/Header/Header.tsx` handles:

- Sticky solid-surface header (translucent/blur was removed in a flatten pass — do not reintroduce)
- Desktop mega menu with `HeaderNavChildren` config (groups of labelled/hinted items + optional "view all")
- Mobile accordion drawer with the same nav data

Nav data is built server-side in `apps/frontend/src/app/layout.tsx` via `buildNav()`, which reads from `lib/content.ts` and passes `HeaderNavItem[]` to the Header as props. Labels use `formatWithAbbr(title, shortName)` to render "Ministry of Health (MoH)" consistently.

## Styling

- **No gradients, no backdrop-blur.** Visual rhythm is done with four flat background shades (`--uggov-bg`, `--uggov-bg-subtle`, `--uggov-bg-muted`, `--uggov-bg-elevated`). Gradients were stripped in a deliberate pass — keep them out.
- **Flag palette only.** No blue, green, teal, indigo, amber, coral. Derived in-palette tones (`--uggov-gold`, `--uggov-crimson`) exist for semantic cases where pure red/yellow/black can't do the job.
- **Focus ring** is token-level: yellow inner + black outer (`--uggov-shadow-focus`). `SearchBox` and `.uggov-input` suppress the global ring on their raw inputs so the container can own the focus styling.
- **Light/dark** via `data-theme` on `<html>` + `prefers-color-scheme` fallback. The `ThemeToggle` client component is the single writer.

## Known gotchas

- **`&amp;&amp;` HTML-encoding bug** has bitten this file set twice when writing `.tsx`. Always author `&&` as literal ampersand-ampersand, never `&amp;&amp;`. Same for `&amp;` inside plain JS string literals — JSX handles text children, but plain JS strings render the entity literally.
- The bash harness quirks `exit=1` on the `pnpm exec next build > log.log; echo exit=$?` pattern even when Next itself exits 0 and prints the full page table. When verifying a build, look at the **tail of the log** (`Generating static pages (N/N)` + route table) rather than the reported exit code.
- Running `pnpm dev:frontend` holds a lock on `.next`; killing or re-running a production build while dev is alive can leave stale state. `rm -rf .next` before a build if behaviour is odd.
- The `apps/frontend/next.config.ts` has `transpilePackages` for every workspace package — keep it updated if you add a new one (CSS and TS from workspaces won't resolve otherwise).

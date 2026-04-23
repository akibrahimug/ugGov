# GOV.UG

A unified online home for the Government of Uganda — bringing every ministry, agency, commission and programme under one voice, one design, one search.

This repository contains both the **pitch artifact** (used to convince Government stakeholders this is worth doing) and the **production foundation** (the same code runs in production if greenlit).

## What's inside

```
apps/
  frontend/              Next.js 15 App Router — the public site (www.gov.ug)
  studio/                Sanity publishing studio — where editors work

packages/
  ui-tokens/             Design tokens (colour, typography, spacing) as CSS + TS
  frontend-components/   React port of the GOV.UK Design System, rebranded
  content-schemas/       Sanity + Zod schemas, shared TypeScript types
  seed-content/          Real-enough seed content (MoH, MAAIF, MoFPED + programmes)

docs/
  pitch/                 Pitch narrative — problem, vision, precedent, approach, costs, ask
```

## Prerequisites

- Node.js ≥ 20.19
- pnpm 10.18+ (`npm install -g pnpm`)

## Install &amp; run

```bash
pnpm install
pnpm dev:frontend     # http://localhost:3000
pnpm dev:studio       # http://localhost:3333 (needs Sanity project id)
```

The frontend runs standalone against in-repo seed content — no Sanity project required to demo.

## Connecting Sanity (when ready)

1. Create a Sanity project at https://www.sanity.io/manage.
2. Copy `apps/studio/.env.example` → `apps/studio/.env` and fill in `SANITY_STUDIO_PROJECT_ID`.
3. `pnpm dev:studio` to run the studio locally.
4. `pnpm -F @ug-gov/studio deploy` to publish the studio to `<project>.sanity.studio`.
5. Switch `apps/frontend/src/lib/content.ts` to read from Sanity (swap the seed imports for a Sanity client) — the public API of that module stays the same, so no consumer needs to change.

## The pitch

Read `docs/pitch/00-narrative.md` for the one-page story, then work through the numbered files in order.

**Running the demo in the pitch room**: see `docs/pitch/07-demo-runbook.md`.

## Phased roadmap

See `docs/pitch/04-approach.md` for the full phased plan. In summary:

- **Phase 0** (months 0–3): discovery, foundations, team formation.
- **Phase 1** (months 3–9): pilot with 2 ministries (proposed: Health + Agriculture).
- **Phase 2** (months 9–18): roll out to all 25 ministries + top 30 agencies.
- **Phase 3** (months 18–30): local government (146 districts), publications library.
- **Phase 4** (months 24–36): 100 service how-to-apply pages, deep links to transactional agencies.
- **Phase 5** (36+): migration to sovereign Ugandan hosting.

## Principles

1. **One voice.** Every public body renders in the shared design.
2. **Federate, don't subsume.** Transactional agencies (URA, NIRA, NSSF, BoU) keep their systems; GOV.UG deep-links.
3. **Accessibility is not negotiable.** WCAG 2.2 AA from day one; tested on cheap Android over 3G.
4. **Fewer apps, not more.** Three services, not twelve.
5. **Portable by design.** No vendor lock-in — content model is exportable, infrastructure is reproducible.

## Licence

Code is available under MIT. Content under an Open Government Licence (TBD, aligned with Uganda Access to Information Act). Adapted components trace to `alphagov/govuk-frontend` (MIT/OGL).

## Status

Phase 0 working prototype. **This is a pitch artifact** — not yet in production use. The code, the content model, and the design system are production-shaped so that nothing is thrown away if the programme is approved.
# ugGov

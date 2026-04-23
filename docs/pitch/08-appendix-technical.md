# Technical appendix

This appendix exists for the one person in the room who will ask how it is actually built. It is not the pitch. Keep the main deck free of jargon.

## Stack in one paragraph

GOV.UG is a monorepo containing a Next.js frontend, a Sanity publishing studio, a set of shared content schemas, and a forked and rebranded GOV.UK Design System. Content is served statically via a CDN (Cloudflare, which has a Kampala edge PoP), with incremental revalidation on editorial publish. Search runs on Meilisearch. Identity for staff is centralised through an OAuth provider; citizen-facing identity integrates with NIRA rather than rebuilding it.

## Three applications, not twelve

GOV.UK grew to 12+ publishing and frontend apps over a decade. A new programme should not replicate that sprawl. GOV.UG runs three apps:

1. `apps/studio` — the Sanity publishing studio. Editors work here.
2. `apps/frontend` — the Next.js public site. Citizens read here.
3. A search indexer — pulls from Sanity on publish webhooks and writes to Meilisearch.

Anything more sophisticated (microservices, separate publishing APIs, dedicated router) should only be introduced when measured editorial pain demands it.

## Why Next.js

- Mature, stable, backed by a large vendor-independent community.
- Native static site generation — content rarely changes post-publish, so render at build time, revalidate on webhook.
- Native React Server Components — smaller bundles delivered to the browser, faster on cheap phones.
- `next/font` handles the font loading story automatically with good performance defaults.

## Why Sanity (today)

- Structured-content-first: it encourages the typed content graph that gov.uk built over years.
- Best-in-class editor UX. This matters more than any technical criterion because editorial adoption is the single biggest risk to the programme.
- Real-time collaboration, scheduled publishing, role-based access control.
- Content is exportable at any time — if we later migrate to self-hosted Payload or similar, we are not locked in.

Alternative considered: **Payload CMS**, self-hosted on Postgres, is the strong candidate if sovereignty forces in-country hosting from day one. The content model in this repo (`packages/content-schemas`) is deliberately portable between the two.

## Why the forked GOV.UK Design System

The GOV.UK Design System is a decade of accessibility research compressed into ~40 components, MIT-licensed. Forking and rebranding it is 6–12 months of work that we do not have to do.

In this repository, `packages/frontend-components` is our rebranded React port. It implements the same visual patterns (brand strip, service bar, breadcrumbs, phase banner, summary list, inset text, warning text, notification banner) but with Ugandan colour tokens and typography (Inter, which is free and renders well on low-end Android — the GDS Transport font is licensed and must be replaced).

## Content model

Adapted from `alphagov/publishing-api/content_schemas`. Core document types:

- `organisation` — ministry, agency, commission, board, state house, parliament, judiciary, local government, public corporation.
- `person`, `role`, `ministerial_role` — for leadership listings.
- `news_article` — news stories, press releases, speeches, statements.
- `publication` — Acts, statutory instruments, budgets, annual reports, policy papers, research.
- `guide` — step-by-step how-to content.
- `service` — signposting to transactional services (with deep-links).
- `programme` — flagship programmes like PDM, Emyooga, SAGE.
- `location` — districts, cities, municipalities, sub-counties.
- `topic`, `collection` — for cross-cutting navigation.

Every document has a **permanent `content_id` UUID** that never changes, plus a slug (URL path) that can change without breaking permalinks.

## URLs

`www.gov.ug/<document-path>`. Single domain, deep paths. This matches gov.uk's 2012 decision, which was made to preserve domain authority, to let citizens spot phishing more easily, and to simplify operations. Sub-domains are reserved for non-citizen-facing surfaces — the studio (`publishing.gov.ug`), static assets (`assets.gov.ug`), the design system docs (`design-system.gov.ug`) and any eventual citizen identity (`account.gov.ug`).

Transactional agencies (URA, NIRA, NSSF, BoU) keep their existing domains. GOV.UG deep-links into them. It does not replace them.

## Hosting

- **Phase 1**: Vercel for the frontend, Sanity Cloud (EU region) for the CMS, Cloudflare CDN, a small Postgres for any dynamic data.
- **Phase 5**: everything migrates to NITA-U National Data Centre on Kubernetes (or Raxio as an interim step). The architecture is designed for this migration from day one.

## Performance budget

- Initial JS + CSS payload < 100 KB gzipped.
- Largest Contentful Paint < 2.5 s on 3G.
- Passes Core Web Vitals on a 2021-era low-end Android.
- Every page is server-rendered (no client hydration required to read content).

## Accessibility

- Forked GOV.UK components already pass WCAG 2.2 AA. We inherit that.
- `axe-core` runs in CI on every pull request.
- Annual third-party accessibility audit from a registered provider.
- Accessibility statement published on site (already present at `/accessibility`).

## Observability

- Plausible self-hosted for analytics (privacy-first, avoids GDPR/DPA consent banners).
- Sentry for error tracking.
- Grafana + Loki for logs and metrics.
- Status page at `status.gov.ug` with public incident history.

## CI/CD

- GitHub Actions or GitLab CI.
- On every pull request: typecheck, lint (Biome), unit tests (Vitest), e2e smoke (Playwright), accessibility regression (axe-core).
- Deploy to a preview environment automatically for each PR.
- Protected main branch; production deploys only after review and CI green.

## Why not (some things)

- **WordPress**: every MDA already runs it and that is the problem.
- **Drupal**: heavier operational footprint than Sanity for our scale.
- **Custom CMS**: we are not funded to build one; Sanity buys us a best-in-class editor for free.
- **Subdomains per ministry**: decided against — see §URLs above.
- **Microservices**: explicitly rejected — see §Three applications.
- **A national identity system built here**: explicitly rejected — NIRA exists and is the right place for that.

## Migration in

For each MDA we onboard:
1. Script pulls their WordPress REST API into a staging Sanity dataset as drafts.
2. Human review maps posts/pages to our document types.
3. 301 redirect map is generated (old slug → new URL) and loaded into Cloudflare Workers or Next middleware.
4. The MDA team does a final review on preview URLs.
5. Cut over by DNS flip.

Inbound Google rank is preserved; outbound citizen links continue to work; no content is lost.

# Contributing

This repository follows a small set of conventions to keep the codebase navigable as it grows.

## Workspace layout

- `apps/*` — runnable applications (frontend, studio).
- `packages/*` — shared libraries consumed by the apps.
- `docs/*` — pitch material, governance, engineering standards.

Never cross-depend between `apps/*`. If two apps need the same code, lift it to a package.

## Commits

Short, imperative: `add organisation detail page`, not `added organisation detail page` or `feat: ...`.

## Style

- TypeScript everywhere; no `any` without a comment.
- Biome handles formatting and linting (`pnpm lint:fix`).
- CSS uses tokens from `@ug-gov/ui-tokens`; no hardcoded colours, sizes, or font families in app code.

## Components

When adding a component to `packages/frontend-components`:

1. Create a folder under `src/components/<Name>/` with `.tsx` and `.css`.
2. Add the CSS to `src/styles.css`.
3. Re-export from `src/index.ts`.
4. Keep the public API minimal. Prefer additional components over variant flags.

## Content schemas

When adding a new document type:

1. Add the Sanity schema in `packages/content-schemas/src/sanity/<name>.ts`.
2. Register it in `packages/content-schemas/src/sanity/index.ts`.
3. Add the matching Zod schema + TypeScript type in `src/types/index.ts`.
4. Add a desk-structure entry in `apps/studio/src/deskStructure.ts` if it deserves its own top-level item.

## Accessibility

Every page and component must pass `axe-core` with zero serious violations. Run:

```bash
pnpm test       # includes axe a11y checks
```

## Pull requests

Keep PRs small. One PR per logical change. Include screenshots for visible UI changes — ideally side-by-side before/after.

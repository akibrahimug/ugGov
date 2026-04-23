/**
 * Content access layer.
 *
 * Today this reads from @ug-gov/seed-content (in-repo fixtures).
 * In production it will be swapped for a Sanity/Content-Store client
 * with the same public API — so consumers don't change.
 */
import {
  organisations,
  programmes,
  news,
  publications,
  guides,
  services,
  people,
  roles,
  lookup,
} from '@ug-gov/seed-content';
import type {
  Organisation,
  Programme,
  NewsArticle,
  Publication,
  Guide,
  Service,
  Person,
  Role,
} from '@ug-gov/content-schemas';

export function listOrganisations(opts?: {
  kind?: Organisation['kind'] | Array<Organisation['kind']>;
  featured?: boolean;
}): Organisation[] {
  return organisations
    .filter((o) => {
      if (opts?.kind) {
        const kinds = Array.isArray(opts.kind) ? opts.kind : [opts.kind];
        if (!kinds.includes(o.kind)) return false;
      }
      if (opts?.featured && !o.featured) return false;
      return true;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getOrganisationBySlug(slug: string): Organisation | undefined {
  return organisations.find((o) => o.slug.current === slug);
}

export function listProgrammes(opts?: { featured?: boolean }): Programme[] {
  return programmes
    .filter((p) => (opts?.featured ? p.featured : true))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug.current === slug);
}

export function listNews(opts?: { limit?: number; organisationId?: string }): NewsArticle[] {
  const sorted = [...news].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const filtered = opts?.organisationId
    ? sorted.filter((n) => n.organisation._ref === opts.organisationId)
    : sorted;
  return opts?.limit ? filtered.slice(0, opts.limit) : filtered;
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug.current === slug);
}

export function listPublications(opts?: {
  limit?: number;
  organisationId?: string;
}): Publication[] {
  const sorted = [...publications].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const filtered = opts?.organisationId
    ? sorted.filter((p) => p.organisation._ref === opts.organisationId)
    : sorted;
  return opts?.limit ? filtered.slice(0, opts.limit) : filtered;
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug.current === slug);
}

export function listGuides(opts?: { organisationId?: string }): Guide[] {
  const filtered = opts?.organisationId
    ? guides.filter((g) => g.organisation._ref === opts.organisationId)
    : guides;
  return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug.current === slug);
}

export function listServices(): Service[] {
  return [...services].sort((a, b) => a.title.localeCompare(b.title));
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug.current === slug);
}

export function getPerson(id: string): Person | undefined {
  return people.find((p) => p._id === id);
}

export function listRolesForOrg(organisationId: string): Role[] {
  return roles.filter((r) => r.organisation._ref === organisationId);
}

export function resolveRef<T = unknown>(ref: string): T | undefined {
  return lookup<T>(ref);
}

/** Simple substring search across all titles + summaries. Replace with Meilisearch in prod. */
export function search(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const haystacks: Array<{
    url: string;
    title: string;
    kind: string;
    summary: string;
  }> = [];

  for (const o of organisations) {
    haystacks.push({
      url: `/organisations/${o.slug.current}`,
      title: o.title,
      kind: o.kind === 'ministry' ? 'Ministry' : 'Organisation',
      summary: o.mandate,
    });
  }
  for (const p of programmes) {
    haystacks.push({
      url: `/programmes/${p.slug.current}`,
      title: p.title,
      kind: 'Programme',
      summary: p.summary,
    });
  }
  for (const n of news) {
    haystacks.push({
      url: `/news/${n.slug.current}`,
      title: n.title,
      kind: n.category === 'press_release' ? 'Press release' : 'News',
      summary: n.summary,
    });
  }
  for (const p of publications) {
    haystacks.push({
      url: `/publications/${p.slug.current}`,
      title: p.title,
      kind: 'Publication',
      summary: p.summary,
    });
  }
  for (const g of guides) {
    haystacks.push({
      url: `/guidance/${g.slug.current}`,
      title: g.title,
      kind: 'Guidance',
      summary: g.summary,
    });
  }
  for (const s of services) {
    haystacks.push({
      url: `/services/${s.slug.current}`,
      title: s.title,
      kind: 'Service',
      summary: s.summary,
    });
  }

  return haystacks.filter(
    (h) => h.title.toLowerCase().includes(q) || h.summary.toLowerCase().includes(q),
  );
}

import type { MetadataRoute } from 'next';
import {
  listOrganisations,
  listProgrammes,
  listNews,
  listPublications,
  listGuides,
  listServices,
} from '@/lib/content';
import { APPLY_CONFIGS } from './services/[slug]/apply/applyConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.gov.ug';
  const staticUrls = [
    '/',
    '/about',
    '/accessibility',
    '/privacy',
    '/search',
    '/contact',
    '/feedback',
    '/find-a-parish',
    '/organisations',
    '/news',
    '/publications',
    '/programmes',
    '/guidance',
    '/services',
  ];

  return [
    ...staticUrls.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '/' ? 1.0 : 0.7,
    })),
    ...listOrganisations().map((o) => ({
      url: `${base}/organisations/${o.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...listProgrammes().map((p) => ({
      url: `${base}/programmes/${p.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...listNews().map((n) => ({
      url: `${base}/news/${n.slug.current}`,
      lastModified: new Date(n.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...listPublications().map((p) => ({
      url: `${base}/publications/${p.slug.current}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...listGuides().map((g) => ({
      url: `${base}/guidance/${g.slug.current}`,
      lastModified: new Date(g.lastReviewedAt ?? Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...listServices().map((s) => ({
      url: `${base}/services/${s.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...listServices()
      .filter((s) => APPLY_CONFIGS[s.slug.current])
      .map((s) => ({
        url: `${base}/services/${s.slug.current}/apply`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      })),
  ];
}

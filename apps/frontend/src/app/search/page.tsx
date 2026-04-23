import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchBox, Tag } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { search } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search services, news, guidance, organisations and publications across GOV.UG.',
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const results = q ? search(q) : [];
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
        eyebrow="Search"
        title={q ? `Results for “${q}”` : 'Search GOV.UG'}
        lede={q ? `${results.length} result${results.length === 1 ? '' : 's'}` : undefined}
      />
      <div className="uggov-section__inner uggov-section">
        <div style={{ marginBottom: '2rem', maxWidth: '640px' }}>
          <SearchBox size="lg" defaultValue={q} />
        </div>
        {q && results.length === 0 && (
          <p>No results found. Try a different search term or browse our <Link href="/organisations" className="uggov-link">organisations directory</Link>.</p>
        )}
        {results.length > 0 && (
          <ul style={{ listStyle: 'none' }} className="uggov-stack--lg">
            {results.map((r) => (
              <li
                key={r.url}
                style={{ borderBottom: '1px solid var(--uggov-border)', paddingBottom: '1rem' }}
              >
                <div className="uggov-meta" style={{ marginBottom: '0.25rem' }}>
                  <Tag variant="grey">{r.kind}</Tag>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  <Link href={r.url} className="uggov-link">
                    {r.title}
                  </Link>
                </h2>
                <p>{r.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Tag } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { listPublications, resolveRef } from '@/lib/content';
import { formatLongDate } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Acts, statutory instruments, budgets, annual reports, policy papers and research from the Government of Uganda.',
};

export default function PublicationsPage() {
  const items = listPublications();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Publications' }]}
        eyebrow="Library"
        title="Publications"
        lede="Acts, statutory instruments, policy papers, budgets, annual reports and research from every public body."
      />
      <div className="uggov-section__inner uggov-section">
        <ul style={{ listStyle: 'none' }} className="uggov-stack--lg">
          {items.map((p) => {
            const org = resolveRef<Organisation>(p.organisation._ref);
            return (
              <li
                key={p._id}
                style={{ borderBottom: '1px solid var(--uggov-border)', paddingBottom: '1.25rem' }}
              >
                <div className="uggov-meta" style={{ marginBottom: '0.5rem' }}>
                  <Tag variant="grey">{p.publicationType.replace(/_/g, ' ')}</Tag>
                  <span>{formatLongDate(p.publishedAt)}</span>
                  {org && (
                    <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                      {org.shortName ?? org.title}
                    </Link>
                  )}
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  <Link href={`/publications/${p.slug.current}`} className="uggov-link">
                    {p.title}
                  </Link>
                </h2>
                <p>{p.summary}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

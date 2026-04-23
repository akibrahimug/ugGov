import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Tag } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { getPublicationBySlug, listPublications, resolveRef } from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import { formatLongDate, formatFileSize } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listPublications().map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPublicationBySlug(slug);
  if (!p) return { title: 'Not found' };
  return { title: p.title, description: p.summary };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();
  const org = resolveRef<Organisation>(pub.organisation._ref);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Publications', href: '/publications' },
          { label: pub.title },
        ]}
        eyebrow={pub.publicationType.replace(/_/g, ' ')}
        title={pub.title}
        lede={pub.summary}
      />
      <div className="uggov-content-layout">
        <article>
          <div className="uggov-meta uggov-mb-6">
            <Tag variant="grey">{pub.publicationType.replace(/_/g, ' ')}</Tag>
            <span>Published {formatLongDate(pub.publishedAt)}</span>
            {org && (
              <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                {org.shortName ?? org.title}
              </Link>
            )}
          </div>

          {pub.attachments && pub.attachments.length > 0 && (
            <section
              aria-labelledby="downloads"
              style={{
                border: '1px solid var(--uggov-border)',
                padding: '1.25rem',
                marginBottom: '2rem',
                background: 'var(--uggov-surface-muted)',
              }}
            >
              <h2 id="downloads" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                Documents
              </h2>
              <ul style={{ listStyle: 'none' }}>
                {pub.attachments.map((a) => (
                  <li key={a.title} style={{ marginBottom: '0.5rem' }}>
                    <a href={a.url} className="uggov-link">
                      {a.title}
                    </a>{' '}
                    <span className="uggov-meta">
                      {a.fileType && <span>{a.fileType}</span>}
                      {a.fileSizeBytes && <span>{formatFileSize(a.fileSizeBytes)}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pub.body && <PortableText blocks={pub.body} />}
        </article>
      </div>
    </>
  );
}

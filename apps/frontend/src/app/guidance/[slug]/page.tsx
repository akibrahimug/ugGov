import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { getGuideBySlug, listGuides, resolveRef } from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import { formatLongDate } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listGuides().map((g) => ({ slug: g.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: 'Not found' };
  return { title: g.title, description: g.summary };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const org = resolveRef<Organisation>(guide.organisation._ref);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guidance', href: '/guidance' },
          { label: guide.title },
        ]}
        eyebrow="Guidance"
        title={guide.title}
        lede={guide.summary}
      />
      <div className="uggov-content-layout">
        <article className="uggov-stack--lg">
          {guide.sections.map((s) => {
            const anchor = s.slug ?? s.heading.toLowerCase().replace(/\s+/g, '-');
            return (
              <section key={anchor} id={anchor} aria-labelledby={`h-${anchor}`}>
                <h2 id={`h-${anchor}`} className="uggov-section__heading">
                  {s.heading}
                </h2>
                <PortableText blocks={s.body} />
              </section>
            );
          })}
          {guide.lastReviewedAt && (
            <p
              className="uggov-meta"
              style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--uggov-border)' }}
            >
              <span>Last reviewed: {formatLongDate(guide.lastReviewedAt)}</span>
              {guide.nextReviewDueAt && <span>Next review: {formatLongDate(guide.nextReviewDueAt)}</span>}
            </p>
          )}
        </article>
        <aside className="uggov-content-layout__aside">
          <h2>Contents</h2>
          <ul>
            {guide.sections.map((s) => {
              const anchor = s.slug ?? s.heading.toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={anchor}>
                  <a href={`#${anchor}`} className="uggov-link">
                    {s.heading}
                  </a>
                </li>
              );
            })}
          </ul>
          {org && (
            <>
              <h2 style={{ marginTop: '1.5rem' }}>Published by</h2>
              <p>
                <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                  {org.title}
                </Link>
              </p>
            </>
          )}
        </aside>
      </div>
    </>
  );
}

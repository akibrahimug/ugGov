import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SummaryList } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import { getServiceBySlug, listServices, resolveRef } from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import type { Organisation } from '@ug-gov/content-schemas';
import { APPLY_CONFIGS } from './apply/applyConfig';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listServices().map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: 'Not found' };
  return { title: s.title, description: s.summary };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();

  const hasInternalApply = Boolean(APPLY_CONFIGS[slug]);
  const internalApplyHref = hasInternalApply ? `/services/${slug}/apply` : undefined;
  const startHref = internalApplyHref ?? svc.startUrl;
  const startLabel = svc.startUrlLabel ?? 'Start now';

  const facts = [
    ...(svc.estimatedTime ? [{ key: 'Typical time', value: svc.estimatedTime }] : []),
    ...(svc.cost ? [{ key: 'Cost', value: svc.cost }] : []),
    ...(svc.deliveredBy.length
      ? [
          {
            key: 'Delivered by',
            value: (
              <ul style={{ listStyle: 'none' }}>
                {svc.deliveredBy.map((ref) => {
                  const org = resolveRef<Organisation>(ref._ref);
                  if (!org) return null;
                  return (
                    <li key={ref._ref}>
                      <Link href={`/organisations/${org.slug.current}`} className="uggov-link">
                        {org.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: svc.title },
        ]}
        eyebrow="Service"
        title={svc.title}
        lede={svc.summary}
        actions={
          startHref ? (
            <Link
              href={startHref}
              className="uggov-button uggov-button--primary uggov-button--lg"
            >
              {startLabel}
            </Link>
          ) : undefined
        }
      />
      <div className="uggov-content-layout">
        <article className="uggov-stack--lg">
          <section aria-labelledby="eligibility">
            <h2 id="eligibility" className="uggov-section__heading">
              Who can use this
            </h2>
            <PortableText blocks={svc.eligibility} />
          </section>
          <section aria-labelledby="how">
            <h2 id="how" className="uggov-section__heading">
              How to apply
            </h2>
            <PortableText blocks={svc.howToApply} />
          </section>
          {startHref && (
            <div>
              <Link
                href={startHref}
                className="uggov-button uggov-button--primary uggov-button--lg"
              >
                {startLabel}
              </Link>
              {hasInternalApply && svc.startUrl && (
                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.875rem',
                    color: 'var(--uggov-text-muted)',
                  }}
                >
                  Or apply directly on the{' '}
                  <a href={svc.startUrl} className="uggov-link" rel="noopener">
                    operating agency&apos;s official portal ↗
                  </a>
                  .
                </p>
              )}
            </div>
          )}
        </article>
        <aside className="uggov-content-layout__aside">
          <h2>At a glance</h2>
          <SummaryList rows={facts} noBorder />
        </aside>
      </div>
    </>
  );
}

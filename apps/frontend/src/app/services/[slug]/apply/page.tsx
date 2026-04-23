import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SummaryList } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import { getServiceBySlug, listServices } from '@/lib/content';
import { APPLY_CONFIGS } from './applyConfig';
import { ApplyForm } from './ApplyForm';
import { DemoBanner } from '@/components/DemoBanner';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Only services that have a matching apply config get a /apply page
  return listServices()
    .filter((s) => APPLY_CONFIGS[s.slug.current])
    .map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  const config = APPLY_CONFIGS[slug];
  if (!svc || !config) return { title: 'Not found' };
  return {
    title: `Apply — ${svc.title}`,
    description: config.intro,
  };
}

export default async function ServiceApplyPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const config = APPLY_CONFIGS[slug];
  if (!service || !config) notFound();

  const facts = [
    { key: 'Typical time', value: config.estimatedTime },
    { key: 'Cost', value: config.cost },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${slug}` },
          { label: 'Apply' },
        ]}
        eyebrow="Service application"
        title={config.title}
        lede={config.intro}
      />
      <div className="uggov-content-layout">
        <div>
          <DemoBanner
            externalHref={config.externalUrl}
            externalLabel={config.externalLabel}
          >
            This is a demonstration of the {service.title.toLowerCase()} flow on GOV.UG. No real
            application will be submitted. For a live application, please use the operating
            agency's official portal.
          </DemoBanner>
          <ApplyForm config={config} />
        </div>
        <aside className="uggov-content-layout__aside">
          <h2>At a glance</h2>
          <SummaryList rows={facts} noBorder />
          {config.externalUrl && (
            <>
              <h2 style={{ marginTop: '1.5rem' }}>Prefer the official portal?</h2>
              <p style={{ marginBottom: '1rem', color: 'var(--uggov-text-muted)', fontSize: '0.875rem' }}>
                You can also apply directly on the operating agency's own portal.
              </p>
              <a
                href={config.externalUrl}
                className="uggov-button uggov-button--secondary uggov-button--sm"
                rel="noopener"
              >
                {config.externalLabel ?? 'Open portal'}
                <span className="uggov-button__icon" aria-hidden="true">↗</span>
              </a>
            </>
          )}
        </aside>
      </div>
    </>
  );
}

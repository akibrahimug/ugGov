import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SummaryList } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { getProgrammeBySlug, listProgrammes, resolveRef } from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import { formatLongDate } from '@/lib/format';
import type { Organisation } from '@ug-gov/content-schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listProgrammes().map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgrammeBySlug(slug);
  if (!p) return { title: 'Not found' };
  return { title: p.title, description: p.summary };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const p = getProgrammeBySlug(slug);
  if (!p) notFound();
  const lead = resolveRef<Organisation>(p.leadOrganisation._ref);

  const facts = [
    ...(p.launchedAt ? [{ key: 'Launched', value: formatLongDate(p.launchedAt) }] : []),
    ...(p.budget ? [{ key: 'Budget', value: p.budget }] : []),
    ...(lead
      ? [
          {
            key: 'Lead organisation',
            value: (
              <Link href={`/organisations/${lead.slug.current}`} className="uggov-link">
                {lead.title}
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programmes', href: '/programmes' },
          { label: p.shortName ?? p.title },
        ]}
        eyebrow={p.shortName ?? 'Programme'}
        title={p.title}
        lede={p.summary}
      />
      <div className="uggov-content-layout">
        <article className="uggov-stack--lg">
          <PortableText blocks={p.overview} />

          {p.eligibility && (
            <section aria-labelledby="eligibility">
              <h2 id="eligibility" className="uggov-section__heading">
                Who can benefit
              </h2>
              <PortableText blocks={p.eligibility} />
            </section>
          )}

          {p.howItWorks && (
            <section aria-labelledby="how">
              <h2 id="how" className="uggov-section__heading">
                How it works
              </h2>
              <PortableText blocks={p.howItWorks} />
            </section>
          )}
        </article>

        <aside className="uggov-content-layout__aside">
          <h2>Programme at a glance</h2>
          <SummaryList rows={facts} noBorder />
          {p.slug.current === 'parish-development-model' && (
            <Link
              href="/find-a-parish"
              className="uggov-button uggov-button--primary uggov-button--base"
            >
              Find your parish
              <span className="uggov-button__icon" aria-hidden="true">→</span>
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}

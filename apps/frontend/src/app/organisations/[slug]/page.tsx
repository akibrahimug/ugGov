import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FadeUp, Stagger, StaggerItem, SummaryList, Tag, Card } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import {
  getOrganisationBySlug,
  listOrganisations,
  listNews,
  listPublications,
  listGuides,
  listRolesForOrg,
  resolveRef,
} from '@/lib/content';
import { PortableText } from '@/lib/portableText';
import { formatLongDate } from '@/lib/format';
import type { Person } from '@ug-gov/content-schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listOrganisations().map((o) => ({ slug: o.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const org = getOrganisationBySlug(slug);
  if (!org) return { title: 'Not found' };
  return {
    title: org.title,
    description: org.mandate,
  };
}

const KIND_LABELS: Record<string, string> = {
  ministry: 'Ministry',
  department: 'Department',
  agency: 'Agency',
  authority: 'Authority',
  commission: 'Commission',
  board: 'Board',
  state_house: 'State House',
  judiciary: 'Judiciary',
  parliament: 'Parliament',
  local_government: 'Local government',
  public_corporation: 'Public corporation',
};

export default async function OrganisationPage({ params }: Props) {
  const { slug } = await params;
  const org = getOrganisationBySlug(slug);
  if (!org) notFound();

  const news = listNews({ limit: 4, organisationId: org._id });
  const pubs = listPublications({ limit: 4, organisationId: org._id });
  const guides = listGuides({ organisationId: org._id });
  const roles = listRolesForOrg(org._id);

  const summaryRows = [
    { key: 'Type', value: KIND_LABELS[org.kind] ?? org.kind },
    ...(org.contactEmail
      ? [
          {
            key: 'Email',
            value: (
              <a href={`mailto:${org.contactEmail}`} className="uggov-link">
                {org.contactEmail}
              </a>
            ),
          },
        ]
      : []),
    ...(org.contactPhone ? [{ key: 'Phone', value: org.contactPhone }] : []),
    ...(org.addressLines?.length
      ? [
          {
            key: 'Address',
            value: (
              <address style={{ fontStyle: 'normal' }}>
                {org.addressLines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </address>
            ),
          },
        ]
      : []),
    ...(org.website
      ? [
          {
            key: 'External website',
            value: (
              <a href={org.website} className="uggov-link" rel="noopener">
                {org.website.replace(/^https?:\/\//, '')}
              </a>
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
          { label: 'Organisations', href: '/organisations' },
          { label: org.shortName ?? org.title },
        ]}
        eyebrow={KIND_LABELS[org.kind]}
        title={org.title}
        lede={org.mandate}
      />
      <div className="uggov-content-layout">
        <div>
          {org.description && (
            <FadeUp>
              <section aria-labelledby="about">
                <h2 id="about" className="uggov-visually-hidden">
                  About
                </h2>
                <PortableText blocks={org.description} />
              </section>
            </FadeUp>
          )}

          {roles.length > 0 && (
            <FadeUp>
              <section aria-labelledby="leadership" style={{ marginTop: '4rem' }}>
                <h2 id="leadership" className="uggov-section__heading">
                  Our ministers
                </h2>
                <Stagger className="uggov-grid uggov-grid--2">
                  {roles.map((r) => {
                    const holder = r.currentHolder
                      ? resolveRef<Person>(r.currentHolder._ref)
                      : undefined;
                    return (
                      <StaggerItem key={r._id}>
                        <Card
                          heading={holder?.name ?? 'Currently vacant'}
                          meta={holder?.honorific ? `${holder.honorific} · ${r.title}` : r.title}
                          description={r.title}
                        />
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </section>
            </FadeUp>
          )}

          {news.length > 0 && (
            <FadeUp>
              <section aria-labelledby="news" style={{ marginTop: '4rem' }}>
                <h2 id="news" className="uggov-section__heading">
                  Latest from {org.shortName ?? org.title}
                </h2>
                <Stagger className="uggov-grid uggov-grid--2">
                  {news.map((n) => (
                    <StaggerItem key={n._id}>
                      <Card
                        href={`/news/${n.slug.current}`}
                        meta={formatLongDate(n.publishedAt)}
                        heading={n.title}
                        description={n.summary}
                      />
                    </StaggerItem>
                  ))}
                </Stagger>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link href={`/news?org=${org._id}`} className="uggov-link">
                    All news from {org.shortName ?? org.title} →
                  </Link>
                </p>
              </section>
            </FadeUp>
          )}

          {guides.length > 0 && (
            <FadeUp>
              <section aria-labelledby="guides" style={{ marginTop: '4rem' }}>
                <h2 id="guides" className="uggov-section__heading">
                  Guidance
                </h2>
                <Stagger className="uggov-grid uggov-grid--2">
                  {guides.map((g) => (
                    <StaggerItem key={g._id}>
                      <Card
                        href={`/guidance/${g.slug.current}`}
                        heading={g.title}
                        description={g.summary}
                      />
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>
            </FadeUp>
          )}

          {pubs.length > 0 && (
            <FadeUp>
              <section aria-labelledby="pubs" style={{ marginTop: '4rem' }}>
                <h2 id="pubs" className="uggov-section__heading">
                  Publications
                </h2>
                <ul className="uggov-stack">
                  {pubs.map((p) => (
                    <li key={p._id}>
                      <Link
                        href={`/publications/${p.slug.current}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          padding: '1rem 1.25rem',
                          borderRadius: 'var(--uggov-radius-md)',
                          border: '1px solid var(--uggov-border)',
                          textDecoration: 'none',
                          color: 'var(--uggov-text)',
                        }}
                      >
                        <div className="uggov-meta">
                          <Tag variant="grey">{p.publicationType.replace(/_/g, ' ')}</Tag>
                          <span>{formatLongDate(p.publishedAt)}</span>
                        </div>
                        <span style={{ fontWeight: 600 }}>{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeUp>
          )}
        </div>

        <aside className="uggov-content-layout__aside" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact {org.shortName ?? org.title}</h2>
          <SummaryList rows={summaryRows} noBorder />
        </aside>
      </div>
    </>
  );
}

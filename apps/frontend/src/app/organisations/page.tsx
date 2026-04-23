import type { Metadata } from 'next';
import { Card, FadeUp, Stagger, StaggerItem } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import { listOrganisations } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Organisations',
  description:
    'Browse all ministries, departments, agencies, commissions and public bodies of the Government of Uganda.',
};

const GROUPS = [
  { heading: 'Ministries', kind: 'ministry' as const },
  {
    heading: 'Agencies & authorities',
    kind: ['agency', 'authority', 'commission', 'board'] as const,
  },
  {
    heading: 'Parliament, Judiciary & State House',
    kind: ['parliament', 'judiciary', 'state_house'] as const,
  },
  { heading: 'Public corporations', kind: 'public_corporation' as const },
];

export default function OrganisationsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Organisations' }]}
        eyebrow="Directory"
        title="Every public body, in one directory."
        lede="All ministries, agencies, commissions and public bodies of the Government of Uganda — searchable, linkable, accessible."
      />
      <div className="uggov-section uggov-section--compact">
        <div className="uggov-section__inner">
          <div className="uggov-stack--xl">
            {GROUPS.map((group) => {
              const orgs = listOrganisations({ kind: group.kind as never });
              if (orgs.length === 0) return null;
              return (
                <section key={group.heading} aria-labelledby={`grp-${group.heading}`}>
                  <FadeUp>
                    <h2 id={`grp-${group.heading}`} className="uggov-section__title" style={{ marginBottom: '2rem' }}>
                      {group.heading}
                    </h2>
                  </FadeUp>
                  <Stagger className="uggov-grid uggov-grid--2">
                    {orgs.map((o) => (
                      <StaggerItem key={o._id}>
                        <Card
                          href={`/organisations/${o.slug.current}`}
                          meta={o.shortName}
                          heading={o.title}
                          description={o.mandate}
                        />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

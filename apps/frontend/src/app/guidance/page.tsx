import type { Metadata } from 'next';
import { Card } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { listGuides, resolveRef } from '@/lib/content';
import type { Organisation } from '@ug-gov/content-schemas';

export const metadata: Metadata = {
  title: 'Guidance',
  description:
    'Step-by-step guidance on using Government of Uganda services — from applying for a National ID to registering a business.',
};

export default function GuidancePage() {
  const items = listGuides();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guidance' }]}
        eyebrow="Guidance"
        title="How-to guides"
        lede="Step-by-step guides to using Government services."
      />
      <div className="uggov-section__inner uggov-section">
        <div className="uggov-grid uggov-grid--2">
          {items.map((g) => {
            const org = resolveRef<Organisation>(g.organisation._ref);
            return (
              <Card
                key={g._id}
                href={`/guidance/${g.slug.current}`}
                meta={org?.shortName ?? org?.title}
                heading={g.title}
                description={g.summary}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

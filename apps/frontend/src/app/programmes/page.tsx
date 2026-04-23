import type { Metadata } from 'next';
import { Card } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { listProgrammes } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'Flagship Government of Uganda programmes — from the Parish Development Model to Emyooga, SAGE and Operation Wealth Creation.',
};

export default function ProgrammesPage() {
  const items = listProgrammes();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Programmes' }]}
        eyebrow="Government programmes"
        title="Programmes"
        lede="Flagship programmes delivering the National Development Plan and the priorities of Government."
      />
      <div className="uggov-section__inner uggov-section">
        <div className="uggov-grid uggov-grid--2">
          {items.map((p) => (
            <Card
              key={p._id}
              href={`/programmes/${p.slug.current}`}
              variant="feature"
              meta={p.shortName}
              heading={p.title}
              description={p.summary}
            />
          ))}
        </div>
      </div>
    </>
  );
}

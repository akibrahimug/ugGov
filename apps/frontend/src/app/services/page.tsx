import type { Metadata } from 'next';
import { Card } from '@ug-gov/frontend-components';
import { PageHeader } from '@/components/PageHeader';
import { listServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Government of Uganda services — apply for an ID, register a business, get a passport, pay tax.',
};

export default function ServicesPage() {
  const items = listServices();
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        eyebrow="Services"
        title="Government services"
        lede="Apply for an ID, register a business, get a passport, pay tax — all in one place."
      />
      <div className="uggov-section__inner uggov-section">
        <div className="uggov-grid uggov-grid--2">
          {items.map((s) => (
            <Card
              key={s._id}
              href={`/services/${s.slug.current}`}
              heading={s.title}
              description={s.summary}
            />
          ))}
        </div>
      </div>
    </>
  );
}

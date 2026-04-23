import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { FindParishView } from '@/components/FindParishView';

export const metadata: Metadata = {
  title: 'Find your parish',
  description:
    'Locate a Ugandan parish on the map — search by name, district or region to see its PDM SACCO status.',
};

export default function FindParishPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programmes', href: '/programmes' },
          { label: 'Parish Development Model', href: '/programmes/parish-development-model' },
          { label: 'Find your parish' },
        ]}
        eyebrow="Parish Development Model"
        title="Find your parish"
        lede="Search by parish, district or region — or click any marker on the map to see its PDM SACCO status, funding balance and registered households."
      />
      <div className="uggov-section__inner" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <FindParishView />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'About GOV.UG',
  description: 'What GOV.UG is, who runs it and why we are building it.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About GOV.UG' }]}
        eyebrow="About"
        title="About GOV.UG"
        lede="GOV.UG is the proposed single online home for the Government of Uganda — bringing together the ministries, agencies and public bodies that serve Ugandans."
      />
      <div className="uggov-content-layout">
        <div className="uggov-prose">
          <p>
            Today, Uganda’s public bodies operate dozens of separate websites. They look different,
            behave differently, and citizens cannot tell at a glance which are genuine. GOV.UG
            proposes one consistent voice, one design system, one search — backed by common
            publishing tools that any ministry can use.
          </p>
          <h2>Our goals</h2>
          <ul className="uggov-prose__list">
            <li>Make it easy for citizens to find a service or information they need.</li>
            <li>Give every public body a clear, trusted, accessible online presence.</li>
            <li>Reduce duplicated hosting and design costs across Government.</li>
            <li>Raise the accessibility floor — every page works on a basic phone over 3G.</li>
            <li>Publish in English, Luganda and Kiswahili from day one.</li>
          </ul>
          <h2>Who is building this</h2>
          <p>
            GOV.UG is proposed as a joint initiative of NITA-U, the Ministry of ICT and National
            Guidance and the Office of the Prime Minister, with technical delivery by a small
            central product team and content ownership distributed across MDAs.
          </p>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy & data protection',
  description: 'How GOV.UG handles personal data in line with the Data Protection and Privacy Act.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]}
        eyebrow="Privacy"
        title="Privacy &amp; data protection"
        lede="How GOV.UG handles personal data, in line with the Data Protection and Privacy Act, 2019."
      />
      <div className="uggov-content-layout">
        <div className="uggov-prose">
          <p>
            GOV.UG collects the minimum personal data required to deliver its services. We do not
            sell or share personal data with third parties for advertising.
          </p>
          <h2>What we collect</h2>
          <ul className="uggov-prose__list">
            <li>Anonymous usage data via a privacy-first analytics tool (no cross-site tracking).</li>
            <li>Any information you choose to submit through feedback forms.</li>
          </ul>
          <p>
            Our data protection officer is registered with the Personal Data Protection Office of
            Uganda.
          </p>
        </div>
      </div>
    </>
  );
}

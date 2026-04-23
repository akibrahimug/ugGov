import type { Metadata } from 'next';
import { SummaryList } from '@ug-gov/frontend-components';
import { PageHero } from '@/components/PageHero';
import { listOrganisations } from '@/lib/content';
import { ContactForm, type ContactOrgOption } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact us',
  description:
    'Send a message to the Government of Uganda — for a specific service, a ministry, press enquiries or feedback on GOV.UG.',
};

export default function ContactPage() {
  const orgs: ContactOrgOption[] = listOrganisations().map((o) => ({
    id: o._id,
    title: o.title,
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact us' }]}
        eyebrow="Contact us"
        title="Get in touch with Government"
        lede="Use this form for general enquiries about services, programmes, or anything else across GOV.UG. For urgent or specific issues, contact the relevant ministry or agency directly."
      />
      <div className="uggov-content-layout">
        <div>
          <ContactForm orgs={orgs} />
        </div>
        <aside className="uggov-content-layout__aside">
          <h2>Response times</h2>
          <SummaryList
            rows={[
              { key: 'General enquiries', value: 'Within 5 working days' },
              { key: 'Press enquiries', value: 'Within 2 working days' },
              { key: 'Urgent service issues', value: 'Contact the relevant ministry directly' },
            ]}
            noBorder
          />
          <h2 style={{ marginTop: '1.5rem' }}>Other ways to reach us</h2>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <strong>Phone:</strong> +256 800 100 200
          </p>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@gov.ug" className="uggov-link">
              info@gov.ug
            </a>
          </p>
        </aside>
      </div>
    </>
  );
}

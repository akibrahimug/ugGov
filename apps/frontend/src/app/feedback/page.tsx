import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { FeedbackForm } from './FeedbackForm';

export const metadata: Metadata = {
  title: 'Report a problem',
  description:
    'Tell us about something that is wrong or broken on GOV.UG — outdated information, accessibility issues or bugs.',
};

export default function FeedbackPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Report a problem' }]}
        eyebrow="Feedback"
        title="Report a problem with GOV.UG"
        lede="Tell us what went wrong. We read every report and use it to improve the site."
      />
      <div className="uggov-content-layout">
        <div>
          <FeedbackForm />
        </div>
        <aside className="uggov-content-layout__aside">
          <h2>What this form is for</h2>
          <p style={{ color: 'var(--uggov-text-muted)', fontSize: '0.9375rem', marginBottom: '1rem' }}>
            Use this form to report issues with GOV.UG itself — content errors, broken links,
            accessibility problems, or unexpected behaviour.
          </p>
          <h2 style={{ marginTop: '1rem' }}>What it is not for</h2>
          <p style={{ color: 'var(--uggov-text-muted)', fontSize: '0.9375rem' }}>
            For specific service queries, please contact the relevant ministry or agency directly,
            or use the <a href="/contact" className="uggov-link">contact form</a>.
          </p>
        </aside>
      </div>
    </>
  );
}

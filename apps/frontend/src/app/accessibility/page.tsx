import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Accessibility statement',
  description: 'How GOV.UG meets accessibility standards and how to report issues.',
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
        eyebrow="Accessibility"
        title="Accessibility statement"
        lede="We want everyone who uses GOV.UG to find it easy to use — no matter who they are, what device they use, or what impairments they have."
      />
      <div className="uggov-content-layout">
        <div className="uggov-prose">
          <p>
            This prototype is being built to meet <strong>WCAG 2.2 Level AA</strong>. Where we fall
            short we will say so openly and set out a plan to fix it.
          </p>
          <h2>What we already do</h2>
          <ul className="uggov-prose__list">
            <li>All pages use a clear visual hierarchy with proper heading structure.</li>
            <li>Every interactive element has a visible keyboard focus state.</li>
            <li>Colour contrast meets or exceeds AA on body text.</li>
            <li>Forms have explicit labels and error messages.</li>
            <li>We do not rely on colour alone to convey meaning.</li>
          </ul>
          <h2>Report a problem</h2>
          <p>
            If you cannot access any part of this site, please tell us what happened and what you
            were trying to do. We aim to reply within 2 working days.
          </p>
        </div>
      </div>
    </>
  );
}

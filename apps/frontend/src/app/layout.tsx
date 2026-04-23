import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import {
  Footer,
  Header,
  type HeaderNavItem,
  SkipLink,
} from '@ug-gov/frontend-components';
import '@ug-gov/ui-tokens/tokens.css';
import '@ug-gov/ui-tokens/reset.css';
import '@ug-gov/frontend-components/styles.css';
import './globals.css';
import { listOrganisations, listProgrammes, listServices } from '@/lib/content';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--uggov-font-loaded',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gov.ug'),
  title: {
    default: 'GOV.UG — Government of Uganda',
    template: '%s — GOV.UG',
  },
  description:
    'The official online home of the Government of Uganda. Find services, news, guidance and publications from every ministry, agency and public body.',
  openGraph: {
    type: 'website',
    siteName: 'GOV.UG',
    locale: 'en_UG',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
};

/** "Ministry of Health (MoH)" — skip the suffix when the short name equals the title. */
function formatWithAbbr(title: string, shortName?: string): string {
  if (!shortName || shortName.toLowerCase() === title.toLowerCase()) return title;
  return `${title} (${shortName})`;
}

/** Trim a sentence to ~110 chars at a word boundary, with an ellipsis. */
function trimTo(text: string, max = 110): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const clipped = clean.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

function buildNav(): HeaderNavItem[] {
  const ministries = listOrganisations({ kind: 'ministry', featured: true });
  const agencies = listOrganisations({
    kind: ['agency', 'authority', 'commission'] as never,
  }).slice(0, 8);
  const programmes = listProgrammes();
  const services = listServices();

  return [
    {
      label: 'Services',
      children: {
        intro: 'Common things people do on GOV.UG',
        groups: [
          {
            heading: 'Popular services',
            items: services.slice(0, 6).map((s) => ({
              label: s.title,
              href: `/services/${s.slug.current}`,
              description: trimTo(s.summary),
            })),
          },
        ],
        viewAllHref: '/services',
        viewAllLabel: 'All services',
      },
    },
    {
      label: 'Organisations',
      children: {
        intro: 'Every ministry, agency and public body',
        groups: [
          {
            heading: 'Ministries',
            items: ministries.map((o) => ({
              label: formatWithAbbr(o.title, o.shortName),
              href: `/organisations/${o.slug.current}`,
              description: trimTo(o.mandate),
            })),
          },
          {
            heading: 'Agencies & authorities',
            items: agencies.map((o) => ({
              label: formatWithAbbr(o.title, o.shortName),
              href: `/organisations/${o.slug.current}`,
              description: trimTo(o.mandate),
            })),
          },
        ],
        viewAllHref: '/organisations',
        viewAllLabel: 'Full directory',
      },
    },
    {
      label: 'Programmes',
      children: {
        intro: 'Flagship programmes delivering the National Development Plan',
        groups: [
          {
            heading: 'Programmes',
            items: programmes.map((p) => ({
              label: formatWithAbbr(p.title, p.shortName),
              href: `/programmes/${p.slug.current}`,
              description: trimTo(p.summary),
            })),
          },
        ],
        viewAllHref: '/programmes',
        viewAllLabel: 'All programmes',
      },
    },
    { label: 'News', href: '/news' },
    { label: 'Guidance', href: '/guidance' },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = buildNav();
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SkipLink />
        <Header serviceName="GOV.UG" serviceHref="/" nav={nav} />
        <main id="main-content" role="main" className="uggov-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

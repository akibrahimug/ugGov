export interface FooterLinkGroup {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps {
  groups?: FooterLinkGroup[];
  licenceText?: React.ReactNode;
  copyright?: string;
}

const DEFAULT_GROUPS: FooterLinkGroup[] = [
  {
    heading: 'Government',
    links: [
      { label: 'How government works', href: '/about' },
      { label: 'Ministries', href: '/organisations' },
      { label: 'Agencies & public bodies', href: '/organisations?type=agency' },
      { label: 'Parliament', href: '/parliament' },
      { label: 'Judiciary', href: '/judiciary' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Find a service', href: '/services' },
      { label: 'Parish Development Model', href: '/programmes/parish-development-model' },
      { label: 'National ID', href: '/guidance/register-for-a-national-identification-number' },
      { label: 'Tax (URA)', href: '/services/register-for-a-tin' },
      { label: 'Business registration', href: '/services/register-a-business' },
    ],
  },
  {
    heading: 'About this site',
    links: [
      { label: 'About GOV.UG', href: '/about' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Report a problem', href: '/feedback' },
    ],
  },
];

export function Footer({
  groups = DEFAULT_GROUPS,
  licenceText,
  copyright = `© Government of Uganda ${new Date().getFullYear()}`,
}: FooterProps) {
  return (
    <footer className="uggov-footer" role="contentinfo">
      <div className="uggov-footer__glow" aria-hidden="true" />
      <div className="uggov-footer__inner">
        <div className="uggov-footer__brand">
          <h2 className="uggov-footer__title">Government of Uganda</h2>
          <p className="uggov-footer__tagline">For God and My Country</p>
        </div>

        <div className="uggov-footer__groups">
          {groups.map((group) => (
            <div key={group.heading} className="uggov-footer__group">
              <h3 className="uggov-footer__group-heading">{group.heading}</h3>
              <ul className="uggov-footer__group-list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="uggov-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="uggov-footer__bottom">
          <div className="uggov-footer__licence">
            {licenceText ?? (
              <p>
                All content is available under the{' '}
                <a href="/licence" className="uggov-footer__link">
                  Open Government Licence of Uganda
                </a>
                , except where otherwise stated.
              </p>
            )}
          </div>
          <p className="uggov-footer__copyright">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

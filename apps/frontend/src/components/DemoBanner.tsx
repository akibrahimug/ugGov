import type { ReactNode } from 'react';

export function DemoBanner({
  externalHref,
  externalLabel = 'Use the official portal',
  children,
}: {
  externalHref?: string;
  externalLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="uggov-demo-banner" role="note">
      <span className="uggov-demo-banner__label">Demo only</span>
      <div className="uggov-demo-banner__body">
        <p>
          {children ?? (
            <>
              This is a prototype form. No real application will be submitted. For live government
              services, please use the official portal of the operating agency.
            </>
          )}
        </p>
        {externalHref && (
          <a
            href={externalHref}
            className="uggov-demo-banner__link"
            rel="noopener"
          >
            {externalLabel} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

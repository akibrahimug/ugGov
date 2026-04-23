import type { ReactNode } from 'react';
import { Tag } from '../Tag/Tag';

export interface PhaseBannerProps {
  phase: 'alpha' | 'beta' | 'discovery';
  children?: ReactNode;
}

export function PhaseBanner({ phase, children }: PhaseBannerProps) {
  return (
    <div className="uggov-phase-banner" role="status">
      <p className="uggov-phase-banner__content">
        <Tag variant="brand">{phase}</Tag>
        <span className="uggov-phase-banner__text">
          {children ?? (
            <>
              This is a new service — your{' '}
              <a href="/feedback" className="uggov-phase-banner__link">
                feedback
              </a>{' '}
              will help us improve it.
            </>
          )}
        </span>
      </p>
    </div>
  );
}

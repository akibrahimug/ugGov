import { Breadcrumbs, type Breadcrumb, FadeUp } from '@ug-gov/frontend-components';
import type { ReactNode } from 'react';

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  actions,
  tinted = true,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section className={`uggov-page-hero${tinted ? ' uggov-page-hero--tinted' : ''}`}>
      <div className="uggov-page-hero__inner">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <FadeUp>
          {eyebrow && <div className="uggov-page-hero__eyebrow">{eyebrow}</div>}
          <h1 className="uggov-page-hero__title">{title}</h1>
          {lede && <p className="uggov-page-hero__lede">{lede}</p>}
          {actions && <div className="uggov-page-hero__actions">{actions}</div>}
        </FadeUp>
      </div>
    </section>
  );
}

import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface CardProps {
  href?: string;
  heading: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  variant?: 'default' | 'feature' | 'glass' | 'outline';
  accent?: string;
  className?: string;
}

export function Card({
  href,
  heading,
  description,
  meta,
  variant = 'default',
  accent,
  className,
}: CardProps) {
  const style = accent
    ? ({ '--uggov-card-accent': accent } as React.CSSProperties)
    : undefined;

  const Inner = (
    <>
      {meta && <div className="uggov-card__meta">{meta}</div>}
      <h3 className="uggov-card__heading">{heading}</h3>
      {description && <p className="uggov-card__description">{description}</p>}
      {href && (
        <span className="uggov-card__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        style={style}
        className={clsx('uggov-card', `uggov-card--${variant}`, 'uggov-card--link', className)}
      >
        {Inner}
      </a>
    );
  }

  return (
    <div style={style} className={clsx('uggov-card', `uggov-card--${variant}`, className)}>
      {Inner}
    </div>
  );
}

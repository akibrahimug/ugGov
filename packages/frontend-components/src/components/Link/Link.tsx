import clsx from 'clsx';
import type { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'inverse' | 'muted' | 'no-underline';
}

export function Link({ variant = 'default', className, children, ...rest }: LinkProps) {
  return (
    <a className={clsx('uggov-link', `uggov-link--${variant}`, className)} {...rest}>
      {children}
    </a>
  );
}

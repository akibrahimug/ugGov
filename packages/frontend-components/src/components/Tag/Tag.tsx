import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface TagProps {
  variant?: 'brand' | 'grey' | 'green' | 'yellow' | 'red' | 'blue';
  children: ReactNode;
}

export function Tag({ variant = 'brand', children }: TagProps) {
  return <strong className={clsx('uggov-tag', `uggov-tag--${variant}`)}>{children}</strong>;
}

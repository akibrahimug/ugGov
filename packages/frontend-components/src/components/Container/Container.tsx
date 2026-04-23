import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';

export interface ContainerProps {
  as?: ElementType;
  width?: 'content' | 'wide' | 'prose';
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = 'div',
  width = 'content',
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={clsx('uggov-container', `uggov-container--${width}`, className)}>
      {children}
    </Tag>
  );
}

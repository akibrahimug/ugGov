import type { ReactNode } from 'react';

export function InsetText({ children }: { children: ReactNode }) {
  return <div className="uggov-inset-text">{children}</div>;
}

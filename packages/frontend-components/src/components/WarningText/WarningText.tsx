import type { ReactNode } from 'react';

export function WarningText({ children }: { children: ReactNode }) {
  return (
    <div className="uggov-warning-text">
      <span className="uggov-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="uggov-warning-text__text">
        <span className="uggov-visually-hidden">Warning: </span>
        {children}
      </strong>
    </div>
  );
}

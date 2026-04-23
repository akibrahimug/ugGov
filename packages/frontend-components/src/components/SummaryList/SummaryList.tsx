import type { ReactNode } from 'react';

export interface SummaryRow {
  key: string;
  value: ReactNode;
  action?: { label: string; href: string };
}

export interface SummaryListProps {
  rows: SummaryRow[];
  noBorder?: boolean;
}

export function SummaryList({ rows, noBorder = false }: SummaryListProps) {
  return (
    <dl className={`uggov-summary-list${noBorder ? ' uggov-summary-list--no-border' : ''}`}>
      {rows.map((row) => (
        <div key={row.key} className="uggov-summary-list__row">
          <dt className="uggov-summary-list__key">{row.key}</dt>
          <dd className="uggov-summary-list__value">{row.value}</dd>
          {row.action && (
            <dd className="uggov-summary-list__actions">
              <a href={row.action.href} className="uggov-summary-list__action-link">
                {row.action.label}
                <span className="uggov-visually-hidden"> {row.key}</span>
              </a>
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

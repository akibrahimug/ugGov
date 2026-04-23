import { forwardRef } from 'react';

export interface ErrorSummaryEntry {
  field: string;
  message: string;
  label: string;
}

export const ErrorSummary = forwardRef<HTMLDivElement, { entries: ErrorSummaryEntry[] }>(
  function ErrorSummary({ entries }, ref) {
    if (entries.length === 0) return null;
    return (
      <div
        ref={ref}
        className="uggov-error-summary"
        role="alert"
        tabIndex={-1}
        aria-labelledby="uggov-error-summary-title"
      >
        <h2 id="uggov-error-summary-title" className="uggov-error-summary__title">
          There{entries.length === 1 ? ' is a problem' : ` are ${entries.length} problems`} with your submission
        </h2>
        <ul className="uggov-error-summary__list">
          {entries.map((e) => (
            <li key={e.field}>
              <a href={`#field-${e.field}`}>{e.message}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

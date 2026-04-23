import type { ReactNode } from 'react';

export interface FieldsetProps {
  legend: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
}

export function Fieldset({ legend, hint, children }: FieldsetProps) {
  return (
    <fieldset className="uggov-fieldset">
      <legend className="uggov-fieldset__legend">{legend}</legend>
      {hint && <div className="uggov-fieldset__hint">{hint}</div>}
      <div className="uggov-fieldset__body">{children}</div>
    </fieldset>
  );
}

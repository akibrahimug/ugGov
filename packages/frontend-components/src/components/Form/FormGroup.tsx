import clsx from 'clsx';
import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react';

export interface FormGroupProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  className?: string;
  children: ReactElement;
}

export function FormGroup({ label, hint, error, optional, className, children }: FormGroupProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const childId = (children.props as { id?: string }).id ?? id;

  const inputWithAria = isValidElement(children)
    ? cloneElement(children, {
        id: childId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      } as Record<string, unknown>)
    : children;

  return (
    <div className={clsx('uggov-form-group', error && 'uggov-form-group--error', className)}>
      <label htmlFor={childId} className="uggov-form-group__label">
        {label}
        {optional && <span className="uggov-form-group__optional"> (optional)</span>}
      </label>
      {hint && (
        <div id={hintId} className="uggov-form-group__hint">
          {hint}
        </div>
      )}
      {error && (
        <div id={errorId} className="uggov-form-group__error">
          <span className="uggov-visually-hidden">Error: </span>
          {error}
        </div>
      )}
      {inputWithAria}
    </div>
  );
}

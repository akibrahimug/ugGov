import clsx from 'clsx';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
};

export function Input({ width = 'full', className, ...rest }: InputProps) {
  return (
    <input
      className={clsx('uggov-input', `uggov-input--w-${width}`, className)}
      {...rest}
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, rows = 5, ...rest }: TextareaProps) {
  return <textarea rows={rows} className={clsx('uggov-input', 'uggov-textarea', className)} {...rest} />;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...rest }: SelectProps) {
  return (
    <select className={clsx('uggov-input', 'uggov-select', className)} {...rest}>
      {children}
    </select>
  );
}

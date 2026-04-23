import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning' | 'inverse';
  size?: 'sm' | 'base' | 'lg';
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'base',
  fullWidth,
  startIcon,
  endIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'uggov-button',
        `uggov-button--${variant}`,
        `uggov-button--${size}`,
        fullWidth && 'uggov-button--full',
        className,
      )}
      {...rest}
    >
      {startIcon && <span className="uggov-button__icon">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="uggov-button__icon">{endIcon}</span>}
    </button>
  );
}

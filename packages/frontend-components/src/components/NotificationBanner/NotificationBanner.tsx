import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface NotificationBannerProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
}

const DEFAULT_TITLES: Record<NonNullable<NotificationBannerProps['variant']>, string> = {
  info: 'Important',
  success: 'Success',
  warning: 'Warning',
  error: 'There is a problem',
};

export function NotificationBanner({
  variant = 'info',
  title,
  children,
}: NotificationBannerProps) {
  const role = variant === 'error' ? 'alert' : 'region';
  const heading = title ?? DEFAULT_TITLES[variant];
  return (
    <div
      className={clsx('uggov-notification', `uggov-notification--${variant}`)}
      role={role}
      aria-labelledby="uggov-notification-title"
      tabIndex={-1}
    >
      <div className="uggov-notification__header">
        <h2 id="uggov-notification-title" className="uggov-notification__title">
          {heading}
        </h2>
      </div>
      <div className="uggov-notification__content">{children}</div>
    </div>
  );
}

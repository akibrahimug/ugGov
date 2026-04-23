import clsx from 'clsx';

export interface SearchBoxProps {
  action?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  size?: 'base' | 'lg';
  label?: string;
  className?: string;
}

export function SearchBox({
  action = '/search',
  name = 'q',
  placeholder = 'Search GOV.UG',
  defaultValue,
  size = 'base',
  label = 'Search GOV.UG',
  className,
}: SearchBoxProps) {
  return (
    <form
      action={action}
      method="get"
      role="search"
      className={clsx('uggov-searchbox', `uggov-searchbox--${size}`, className)}
      aria-label={label}
    >
      <label htmlFor="uggov-searchbox-input" className="uggov-visually-hidden">
        {label}
      </label>
      <span className="uggov-searchbox__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <title>Search</title>
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        id="uggov-searchbox-input"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="uggov-searchbox__input"
        autoComplete="off"
      />
      <button type="submit" className="uggov-searchbox__button">
        Search
      </button>
    </form>
  );
}

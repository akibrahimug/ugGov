export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Breadcrumb[];
  inverse?: boolean;
}

export function Breadcrumbs({ items, inverse = false }: BreadcrumbsProps) {
  return (
    <nav
      className={`uggov-breadcrumbs${inverse ? ' uggov-breadcrumbs--inverse' : ''}`}
      aria-label="Breadcrumb"
    >
      <ol className="uggov-breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="uggov-breadcrumbs__item">
              {item.href && !isLast ? (
                <a href={item.href} className="uggov-breadcrumbs__link">
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

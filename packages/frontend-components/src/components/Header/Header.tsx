'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export interface HeaderNavItemLeaf {
  label: string;
  href: string;
  description?: string;
  active?: boolean;
}

export interface HeaderNavGroup {
  heading?: string;
  items: HeaderNavItemLeaf[];
}

export interface HeaderNavChildren {
  intro?: string;
  groups: HeaderNavGroup[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export interface HeaderNavItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: HeaderNavChildren;
}

export interface HeaderProps {
  serviceName?: string;
  serviceHref?: string;
  nav?: HeaderNavItem[];
  showSearch?: boolean;
  locale?: 'en' | 'lg' | 'sw';
}

export function Header({
  serviceName = 'GOV.UG',
  serviceHref = '/',
  nav,
  showSearch = true,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  // Scroll-for-translucency
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock for mobile drawer
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Escape closes any open panel / drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPanel(null);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click outside header closes mega menu
  useEffect(() => {
    if (!openPanel) return;
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [openPanel]);

  const activePanelItem = nav?.find((i) => i.label === openPanel && i.children);

  return (
    <header
      ref={headerRef}
      className={clsx(
        'uggov-header',
        (scrolled || openPanel) && 'uggov-header--scrolled',
      )}
      role="banner"
    >
      <div className="uggov-header__inner">
        <a
          href={serviceHref}
          className="uggov-header__brand"
          aria-label="Government of Uganda, home"
        >
          <span className="uggov-header__crest" aria-hidden="true">
            <CoatOfArms />
          </span>
          <span className="uggov-header__brand-text">
            <span className="uggov-header__brand-title">{serviceName}</span>
            <span className="uggov-header__brand-sub">Government of Uganda</span>
          </span>
        </a>

        {nav && nav.length > 0 && (
          <nav className="uggov-header__nav" aria-label="Primary">
            <ul className="uggov-header__nav-list">
              {nav.map((item) => {
                const hasChildren = Boolean(item.children);
                const isOpen = openPanel === item.label;
                if (!hasChildren) {
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={clsx(
                          'uggov-header__nav-link',
                          item.active && 'uggov-header__nav-link--active',
                        )}
                        aria-current={item.active ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={clsx(
                        'uggov-header__nav-link',
                        'uggov-header__nav-trigger',
                        isOpen && 'uggov-header__nav-link--active',
                      )}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={`${menuId}-${item.label}`}
                      onClick={() =>
                        setOpenPanel((prev) => (prev === item.label ? null : item.label))
                      }
                    >
                      {item.label}
                      <svg
                        className="uggov-header__chevron"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <title>Menu</title>
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="uggov-header__utility">
          {showSearch && (
            <a href="/search" className="uggov-header__search-link" aria-label="Search GOV.UG">
              <SearchIcon />
            </a>
          )}
          <ThemeToggle />
          <button
            type="button"
            className="uggov-header__menu-btn"
            aria-controls={menuId}
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span
              className={clsx('uggov-header__menu-icon', drawerOpen && 'is-open')}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* DESKTOP mega menu panel */}
      <AnimatePresence>
        {activePanelItem && activePanelItem.children && (
          <motion.div
            key={activePanelItem.label}
            id={`${menuId}-${activePanelItem.label}`}
            className="uggov-mega"
            role="region"
            aria-label={activePanelItem.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="uggov-mega__inner">
              {activePanelItem.children.intro && (
                <p className="uggov-mega__intro">{activePanelItem.children.intro}</p>
              )}
              <div className="uggov-mega__groups">
                {activePanelItem.children.groups.map((group, gi) => (
                  <div className="uggov-mega__group" key={gi}>
                    {group.heading && (
                      <h3 className="uggov-mega__group-heading">{group.heading}</h3>
                    )}
                    <ul className="uggov-mega__group-list">
                      {group.items.map((leaf) => (
                        <li key={leaf.href}>
                          <a
                            href={leaf.href}
                            className="uggov-mega__link"
                            onClick={() => setOpenPanel(null)}
                          >
                            <span className="uggov-mega__link-label">{leaf.label}</span>
                            {leaf.description && (
                              <span className="uggov-mega__link-desc">{leaf.description}</span>
                            )}
                            <span className="uggov-mega__link-arrow" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {activePanelItem.children.viewAllHref && (
                <div className="uggov-mega__footer">
                  <a
                    href={activePanelItem.children.viewAllHref}
                    className="uggov-button uggov-button--secondary uggov-button--sm"
                    onClick={() => setOpenPanel(null)}
                  >
                    {activePanelItem.children.viewAllLabel ?? 'View all'}
                    <span className="uggov-button__icon" aria-hidden="true">→</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE drawer with accordion */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id={menuId}
            className="uggov-header__drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="uggov-header__drawer-inner">
              {nav?.map((item, i) => (
                <MobileDrawerItem
                  key={item.label}
                  item={item}
                  delay={0.04 * i}
                  onNavigate={() => setDrawerOpen(false)}
                />
              ))}
              <motion.a
                href="/search"
                className="uggov-header__drawer-link"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * (nav?.length ?? 0), duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setDrawerOpen(false)}
              >
                Search
                <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileDrawerItem({
  item,
  delay,
  onNavigate,
}: {
  item: HeaderNavItem;
  delay: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <motion.a
        href={item.href}
        className="uggov-header__drawer-link"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={onNavigate}
      >
        {item.label}
        <span aria-hidden="true">→</span>
      </motion.a>
    );
  }

  return (
    <motion.div
      className="uggov-header__drawer-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        className="uggov-header__drawer-trigger"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {item.label}
        <span
          className={clsx('uggov-header__drawer-chevron', expanded && 'is-open')}
          aria-hidden="true"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <title>Expand</title>
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="uggov-header__drawer-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="uggov-header__drawer-panel-inner">
              {item.children.groups.map((group, gi) => (
                <div key={gi} className="uggov-header__drawer-group">
                  {group.heading && (
                    <h3 className="uggov-header__drawer-group-heading">{group.heading}</h3>
                  )}
                  <ul>
                    {group.items.map((leaf) => (
                      <li key={leaf.href}>
                        <a
                          href={leaf.href}
                          className="uggov-header__drawer-leaf"
                          onClick={onNavigate}
                        >
                          {leaf.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {item.children.viewAllHref && (
                <a
                  href={item.children.viewAllHref}
                  className="uggov-button uggov-button--primary uggov-button--sm"
                  onClick={onNavigate}
                >
                  {item.children.viewAllLabel ?? 'View all'}
                  <span className="uggov-button__icon" aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CoatOfArms() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Government of Uganda</title>
      <defs>
        <linearGradient id="ug-crest" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A0A0B" />
          <stop offset="0.5" stopColor="#FCDC04" />
          <stop offset="1" stopColor="#D90000" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#ug-crest)" />
      <path d="M20 10 L27 20 L20 30 L13 20 Z" fill="#0A0A0B" opacity="0.85" />
      <circle cx="20" cy="20" r="3.5" fill="#FCDC04" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <title>Search</title>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

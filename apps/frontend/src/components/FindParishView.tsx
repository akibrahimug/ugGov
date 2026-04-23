'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { PARISHES, SACCO_LABEL, type Parish } from '@/lib/parishes';

// Map must be client-only — Leaflet touches window during init.
const ParishMap = dynamic(
  () => import('./ParishMap').then((m) => m.ParishMap),
  { ssr: false, loading: () => <div className="uggov-parish-map uggov-parish-map--loading" /> },
);

export function FindParishView() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PARISHES;
    return PARISHES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subCounty.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q),
    );
  }, [query]);

  const selected = selectedId ? PARISHES.find((p) => p.id === selectedId) : undefined;

  return (
    <div className="uggov-parish-layout">
      <aside className="uggov-parish-aside">
        <div className="uggov-parish-search">
          <label htmlFor="parish-search" className="uggov-visually-hidden">
            Search parishes
          </label>
          <span className="uggov-parish-search__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <title>Search</title>
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="parish-search"
            type="search"
            placeholder="Search by parish, district or region…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="uggov-parish-search__input"
            autoComplete="off"
          />
        </div>

        <div className="uggov-parish-count">
          {filtered.length} {filtered.length === 1 ? 'parish' : 'parishes'}
          {query && ' match your search'}
        </div>

        <ul className="uggov-parish-list">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={clsx(
                  'uggov-parish-list__item',
                  selectedId === p.id && 'is-selected',
                )}
                onClick={() => setSelectedId(p.id)}
              >
                <span className="uggov-parish-list__title">{p.name}</span>
                <span className="uggov-parish-list__meta">
                  {p.subCounty} · {p.district} · {p.region}
                </span>
                <span className={clsx('uggov-parish-list__status', `is-${p.saccoStatus}`)}>
                  {SACCO_LABEL[p.saccoStatus]}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="uggov-parish-list__empty">
              No parishes match <strong>{query}</strong>. Try a district or region.
            </li>
          )}
        </ul>
      </aside>

      <div className="uggov-parish-mapwrap">
        <ParishMap
          parishes={PARISHES}
          selectedId={selectedId}
          onSelect={(p) => setSelectedId(p.id)}
        />
        {selected && <SelectedCard parish={selected} />}
      </div>
    </div>
  );
}

function SelectedCard({ parish }: { parish: Parish }) {
  return (
    <div className="uggov-parish-selected" role="region" aria-label="Selected parish">
      <div className="uggov-parish-selected__head">
        <div>
          <div className="uggov-parish-selected__eyebrow">Selected parish</div>
          <h2 className="uggov-parish-selected__name">{parish.name}</h2>
          <div className="uggov-parish-selected__meta">
            {parish.subCounty} · {parish.district} District · {parish.region} region
          </div>
        </div>
        <span
          className={clsx('uggov-parish-selected__status', `is-${parish.saccoStatus}`)}
        >
          {SACCO_LABEL[parish.saccoStatus]}
        </span>
      </div>

      <dl className="uggov-parish-selected__stats">
        {parish.households != null && (
          <div>
            <dt>Registered households</dt>
            <dd>{parish.households.toLocaleString()}</dd>
          </div>
        )}
        {parish.saccoBalance && (
          <div>
            <dt>PDM SACCO balance</dt>
            <dd>{parish.saccoBalance}</dd>
          </div>
        )}
        <div>
          <dt>Coordinates</dt>
          <dd>
            {parish.lat.toFixed(4)}°, {parish.lng.toFixed(4)}°
          </dd>
        </div>
      </dl>
    </div>
  );
}

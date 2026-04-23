'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import type { Parish } from '@/lib/parishes';

interface Props {
  parishes: Parish[];
  selectedId?: string;
  onSelect?: (p: Parish) => void;
}

/** Centre of Uganda, roughly. */
const UGANDA_CENTRE: [number, number] = [1.3733, 32.2903];
const INITIAL_ZOOM = 7;
const FOCUS_ZOOM = 11;

export function ParishMap({ parishes, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, LeafletMarker>>(new Map());
  const onSelectRef = useRef(onSelect);

  // Keep the latest onSelect without reinitialising the map
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
      }).setView(UGANDA_CENTRE, INITIAL_ZOOM);
      mapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'uggov-parish-marker',
        html: '<span></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      parishes.forEach((p) => {
        const marker = L.marker([p.lat, p.lng], { icon })
          .bindTooltip(`${p.name} · ${p.district}`, {
            direction: 'top',
            offset: [0, -10],
          })
          .addTo(map);
        marker.on('click', () => onSelectRef.current?.(p));
        markersRef.current.set(p.id, marker);
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, [parishes]);

  // Fly to selected parish + mark its marker active
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Reset styling on all markers
    markersRef.current.forEach((m) => {
      const el = (m as unknown as { _icon?: HTMLElement })._icon;
      if (el) el.classList.remove('is-selected');
    });

    if (!selectedId) return;
    const marker = markersRef.current.get(selectedId);
    const parish = parishes.find((p) => p.id === selectedId);
    if (!marker || !parish) return;

    map.flyTo([parish.lat, parish.lng], FOCUS_ZOOM, { duration: 0.6 });
    const el = (marker as unknown as { _icon?: HTMLElement })._icon;
    if (el) el.classList.add('is-selected');
  }, [selectedId, parishes]);

  return <div ref={containerRef} className="uggov-parish-map" aria-label="Map of Uganda showing parishes" />;
}

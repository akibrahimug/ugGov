export type SaccoStatus = 'active' | 'enrolling' | 'pending';

export interface Parish {
  id: string;
  name: string;
  subCounty: string;
  district: string;
  region: 'Central' | 'Eastern' | 'Northern' | 'Western';
  lat: number;
  lng: number;
  saccoStatus: SaccoStatus;
  saccoBalance?: string;
  households?: number;
}

/** Sample parishes with approximate coordinates. Used to demonstrate the
 *  find-your-parish experience — the real database covers ~10,700 parishes. */
export const PARISHES: Parish[] = [
  // Central
  {
    id: 'nakasero',
    name: 'Nakasero',
    subCounty: 'Central Division',
    district: 'Kampala',
    region: 'Central',
    lat: 0.3136,
    lng: 32.5811,
    saccoStatus: 'active',
    saccoBalance: 'UGX 42,500,000',
    households: 1240,
  },
  {
    id: 'bugolobi',
    name: 'Bugolobi',
    subCounty: 'Nakawa Division',
    district: 'Kampala',
    region: 'Central',
    lat: 0.3222,
    lng: 32.6164,
    saccoStatus: 'active',
    saccoBalance: 'UGX 38,200,000',
    households: 980,
  },
  {
    id: 'entebbe-central',
    name: 'Entebbe Central',
    subCounty: 'Entebbe Municipality',
    district: 'Wakiso',
    region: 'Central',
    lat: 0.0515,
    lng: 32.4571,
    saccoStatus: 'active',
    saccoBalance: 'UGX 31,800,000',
    households: 860,
  },
  {
    id: 'mukono-central',
    name: 'Mukono Central',
    subCounty: 'Mukono Municipality',
    district: 'Mukono',
    region: 'Central',
    lat: 0.3533,
    lng: 32.7553,
    saccoStatus: 'active',
    saccoBalance: 'UGX 26,400,000',
    households: 1120,
  },
  {
    id: 'masaka-town',
    name: 'Masaka Town',
    subCounty: 'Masaka Municipality',
    district: 'Masaka',
    region: 'Central',
    lat: -0.3333,
    lng: 31.7333,
    saccoStatus: 'active',
    saccoBalance: 'UGX 22,900,000',
    households: 740,
  },
  {
    id: 'mityana-central',
    name: 'Mityana Central',
    subCounty: 'Mityana Municipality',
    district: 'Mityana',
    region: 'Central',
    lat: 0.4015,
    lng: 32.0431,
    saccoStatus: 'enrolling',
    saccoBalance: 'UGX 8,400,000',
    households: 540,
  },

  // Eastern
  {
    id: 'jinja-central',
    name: 'Jinja Central',
    subCounty: 'Jinja Municipality',
    district: 'Jinja',
    region: 'Eastern',
    lat: 0.4241,
    lng: 33.2042,
    saccoStatus: 'active',
    saccoBalance: 'UGX 34,700,000',
    households: 1050,
  },
  {
    id: 'iganga-central',
    name: 'Iganga Central',
    subCounty: 'Iganga Municipality',
    district: 'Iganga',
    region: 'Eastern',
    lat: 0.6167,
    lng: 33.4833,
    saccoStatus: 'enrolling',
    saccoBalance: 'UGX 12,300,000',
    households: 680,
  },
  {
    id: 'mbale-central',
    name: 'Mbale Central',
    subCounty: 'Mbale Industrial Division',
    district: 'Mbale',
    region: 'Eastern',
    lat: 1.0821,
    lng: 34.1756,
    saccoStatus: 'active',
    saccoBalance: 'UGX 29,100,000',
    households: 890,
  },
  {
    id: 'tororo-central',
    name: 'Tororo Central',
    subCounty: 'Tororo Municipality',
    district: 'Tororo',
    region: 'Eastern',
    lat: 0.6929,
    lng: 34.1809,
    saccoStatus: 'active',
    saccoBalance: 'UGX 21,500,000',
    households: 720,
  },
  {
    id: 'soroti-town',
    name: 'Soroti Town',
    subCounty: 'Soroti Municipality',
    district: 'Soroti',
    region: 'Eastern',
    lat: 1.7147,
    lng: 33.6111,
    saccoStatus: 'enrolling',
    saccoBalance: 'UGX 9,800,000',
    households: 610,
  },

  // Northern
  {
    id: 'gulu-central',
    name: 'Gulu Central',
    subCounty: 'Gulu City East Division',
    district: 'Gulu',
    region: 'Northern',
    lat: 2.7796,
    lng: 32.2995,
    saccoStatus: 'active',
    saccoBalance: 'UGX 27,400,000',
    households: 830,
  },
  {
    id: 'lira-central',
    name: 'Lira Central',
    subCounty: 'Lira Municipality',
    district: 'Lira',
    region: 'Northern',
    lat: 2.2499,
    lng: 32.8998,
    saccoStatus: 'active',
    saccoBalance: 'UGX 19,600,000',
    households: 650,
  },
  {
    id: 'arua-town',
    name: 'Arua Town',
    subCounty: 'Arua City',
    district: 'Arua',
    region: 'Northern',
    lat: 3.0201,
    lng: 30.911,
    saccoStatus: 'enrolling',
    saccoBalance: 'UGX 7,100,000',
    households: 520,
  },
  {
    id: 'kitgum-central',
    name: 'Kitgum Central',
    subCounty: 'Kitgum Municipality',
    district: 'Kitgum',
    region: 'Northern',
    lat: 3.2783,
    lng: 32.8869,
    saccoStatus: 'pending',
    saccoBalance: 'UGX 0',
    households: 440,
  },
  {
    id: 'moroto-town',
    name: 'Moroto Town',
    subCounty: 'Moroto Municipality',
    district: 'Moroto',
    region: 'Northern',
    lat: 2.534,
    lng: 34.666,
    saccoStatus: 'pending',
    saccoBalance: 'UGX 0',
    households: 380,
  },

  // Western
  {
    id: 'mbarara-central',
    name: 'Mbarara Central',
    subCounty: 'Mbarara City North',
    district: 'Mbarara',
    region: 'Western',
    lat: -0.6056,
    lng: 30.648,
    saccoStatus: 'active',
    saccoBalance: 'UGX 33,200,000',
    households: 1010,
  },
  {
    id: 'kasese-town',
    name: 'Kasese Town',
    subCounty: 'Kasese Municipality',
    district: 'Kasese',
    region: 'Western',
    lat: 0.1833,
    lng: 30.0833,
    saccoStatus: 'active',
    saccoBalance: 'UGX 17,900,000',
    households: 700,
  },
  {
    id: 'fort-portal-central',
    name: 'Fort Portal Central',
    subCounty: 'Fort Portal City',
    district: 'Kabarole',
    region: 'Western',
    lat: 0.671,
    lng: 30.275,
    saccoStatus: 'active',
    saccoBalance: 'UGX 23,800,000',
    households: 760,
  },
  {
    id: 'hoima-central',
    name: 'Hoima Central',
    subCounty: 'Hoima Municipality',
    district: 'Hoima',
    region: 'Western',
    lat: 1.4353,
    lng: 31.3431,
    saccoStatus: 'enrolling',
    saccoBalance: 'UGX 11,400,000',
    households: 590,
  },
  {
    id: 'kabale-central',
    name: 'Kabale Central',
    subCounty: 'Kabale Municipality',
    district: 'Kabale',
    region: 'Western',
    lat: -1.2417,
    lng: 29.9875,
    saccoStatus: 'active',
    saccoBalance: 'UGX 18,600,000',
    households: 680,
  },
  {
    id: 'rukungiri-central',
    name: 'Rukungiri Central',
    subCounty: 'Rukungiri Municipality',
    district: 'Rukungiri',
    region: 'Western',
    lat: -0.84,
    lng: 29.9397,
    saccoStatus: 'pending',
    saccoBalance: 'UGX 0',
    households: 420,
  },
];

/** Search parishes by free-text against name, sub-county, district, or region. */
export function searchParishes(query: string): Parish[] {
  const q = query.trim().toLowerCase();
  if (!q) return PARISHES;
  return PARISHES.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subCounty.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q),
  );
}

export const SACCO_LABEL: Record<SaccoStatus, string> = {
  active: 'SACCO active',
  enrolling: 'SACCO enrolling',
  pending: 'SACCO pending',
};

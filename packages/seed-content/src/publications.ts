import type { Publication } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const publications: Publication[] = [
  {
    _id: 'pub-001',
    _type: 'publication',
    contentId: '8e4a1e80-0004-4000-8000-000000000001',
    title: 'National Budget Framework Paper 2026/27',
    slug: { current: 'national-budget-framework-paper-2026-27' },
    publicationType: 'budget',
    summary:
      'The National Budget Framework Paper sets out the medium-term macroeconomic framework and the proposed resource envelope for the coming financial year.',
    body: pt([
      'This document lays out Government’s medium-term fiscal strategy, macroeconomic projections and indicative resource allocations for the financial year 2026/27 and the two subsequent outer years.',
    ]),
    publishedAt: '2026-03-20T09:00:00Z',
    organisation: { _ref: 'org-mofped' },
    attachments: [
      {
        title: 'NBFP 2026-27 full document',
        url: '#',
        fileType: 'PDF',
        fileSizeBytes: 4_300_000,
      },
      {
        title: 'NBFP 2026-27 summary slides',
        url: '#',
        fileType: 'PDF',
        fileSizeBytes: 1_100_000,
      },
    ],
  },
  {
    _id: 'pub-002',
    _type: 'publication',
    contentId: '8e4a1e80-0004-4000-8000-000000000002',
    title: 'Health Sector Annual Performance Report 2024/25',
    slug: { current: 'health-sector-annual-performance-report-2024-25' },
    publicationType: 'annual_report',
    summary:
      'The annual performance report reviews outcomes, service coverage and expenditure across the public health system for the past financial year.',
    publishedAt: '2026-02-12T09:00:00Z',
    organisation: { _ref: 'org-moh' },
    attachments: [
      {
        title: 'HSAPR 2024-25',
        url: '#',
        fileType: 'PDF',
        fileSizeBytes: 6_800_000,
      },
    ],
  },
  {
    _id: 'pub-003',
    _type: 'publication',
    contentId: '8e4a1e80-0004-4000-8000-000000000003',
    title: 'Agricultural Sector Strategic Plan 2025/26 – 2029/30',
    slug: { current: 'agricultural-sector-strategic-plan-2025-2030' },
    publicationType: 'policy_paper',
    summary:
      'The Agricultural Sector Strategic Plan sets out the medium-term priorities for agricultural transformation, building on NDP IV and the Parish Development Model.',
    publishedAt: '2026-01-30T09:00:00Z',
    organisation: { _ref: 'org-maaif' },
    attachments: [
      {
        title: 'ASSP 2025-2030',
        url: '#',
        fileType: 'PDF',
        fileSizeBytes: 5_400_000,
      },
    ],
  },
];

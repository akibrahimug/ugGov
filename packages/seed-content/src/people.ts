import type { Person, Role } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const people: Person[] = [
  {
    _id: 'person-min-health',
    _type: 'person',
    contentId: '8e4a1e80-0007-4000-8000-000000000001',
    name: 'Hon. Dr. Jane Aceng Ocero',
    honorific: 'Hon. Dr.',
    slug: { current: 'jane-aceng' },
    biography: pt([
      'Minister of Health since 2016. A paediatrician by training, Dr Aceng previously served as Director General of Health Services.',
    ]),
  },
  {
    _id: 'person-min-agric',
    _type: 'person',
    contentId: '8e4a1e80-0007-4000-8000-000000000002',
    name: 'Hon. Frank Tumwebaze',
    honorific: 'Hon.',
    slug: { current: 'frank-tumwebaze' },
    biography: pt(['Minister of Agriculture, Animal Industry and Fisheries.']),
  },
  {
    _id: 'person-min-finance',
    _type: 'person',
    contentId: '8e4a1e80-0007-4000-8000-000000000003',
    name: 'Hon. Matia Kasaija',
    honorific: 'Hon.',
    slug: { current: 'matia-kasaija' },
    biography: pt(['Minister of Finance, Planning and Economic Development.']),
  },
];

export const roles: Role[] = [
  {
    _id: 'role-min-health',
    _type: 'role',
    contentId: '8e4a1e80-0008-4000-8000-000000000001',
    title: 'Minister of Health',
    slug: { current: 'minister-of-health' },
    organisation: { _ref: 'org-moh' },
    currentHolder: { _ref: 'person-min-health' },
    isMinisterial: true,
  },
  {
    _id: 'role-min-agric',
    _type: 'role',
    contentId: '8e4a1e80-0008-4000-8000-000000000002',
    title: 'Minister of Agriculture, Animal Industry and Fisheries',
    slug: { current: 'minister-of-agriculture' },
    organisation: { _ref: 'org-maaif' },
    currentHolder: { _ref: 'person-min-agric' },
    isMinisterial: true,
  },
  {
    _id: 'role-min-finance',
    _type: 'role',
    contentId: '8e4a1e80-0008-4000-8000-000000000003',
    title: 'Minister of Finance, Planning and Economic Development',
    slug: { current: 'minister-of-finance' },
    organisation: { _ref: 'org-mofped' },
    currentHolder: { _ref: 'person-min-finance' },
    isMinisterial: true,
  },
];

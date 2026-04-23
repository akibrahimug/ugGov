import type { Guide } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const guides: Guide[] = [
  {
    _id: 'guide-nin',
    _type: 'guide',
    contentId: '8e4a1e80-0005-4000-8000-000000000001',
    title: 'How to register for a National Identification Number',
    slug: { current: 'register-for-a-national-identification-number' },
    summary:
      'Every Ugandan citizen aged 16 and above is required to register for a National Identification Number (NIN). This guide explains the process, what to bring, and how long it takes.',
    sections: [
      {
        heading: 'Who needs to register',
        slug: 'who',
        body: pt([
          'Every Ugandan citizen aged 16 and above, and every resident alien intending to stay in Uganda for more than three months, is required to register with NIRA.',
        ]),
      },
      {
        heading: 'What you will need',
        slug: 'what-you-need',
        body: pt([
          {
            list: [
              'A Local Council I (LC1) letter from your village of residence',
              'Your birth certificate (if available)',
              'A parent’s or guardian’s National ID (if registering a minor)',
              'Proof of citizenship (if born outside Uganda)',
            ],
          },
        ]),
      },
      {
        heading: 'Where to register',
        slug: 'where',
        body: pt([
          'Register at any NIRA office — there is one in every district. During periodic mass enrolment drives, parish-level enrolment centres are also activated.',
        ]),
      },
      {
        heading: 'What happens next',
        slug: 'next',
        body: pt([
          'After biometric enrolment you will receive a temporary registration slip. Your National Identification Card is typically ready for collection within 21 working days.',
        ]),
      },
    ],
    lastReviewedAt: '2026-03-15T00:00:00Z',
    nextReviewDueAt: '2026-09-15T00:00:00Z',
    organisation: { _ref: 'org-nira' },
  },
  {
    _id: 'guide-pdm-apply',
    _type: 'guide',
    contentId: '8e4a1e80-0005-4000-8000-000000000002',
    title: 'How to access a loan under the Parish Development Model',
    slug: { current: 'access-a-loan-under-the-parish-development-model' },
    summary:
      'Step-by-step guide to enrolling in your Parish SACCO, preparing an enterprise plan and applying for a loan from the Parish Revolving Fund.',
    sections: [
      {
        heading: 'Check you are eligible',
        body: pt([
          'PDM targets households in the subsistence economy. If you or your household are not regularly selling what you produce, you may qualify.',
        ]),
      },
      {
        heading: 'Join your Parish SACCO',
        body: pt([
          'Each parish has a PDM SACCO. Visit your Parish Chief or the SACCO office to become a member.',
        ]),
      },
      {
        heading: 'Prepare your enterprise plan',
        body: pt([
          'Work with your Parish Development Committee to identify a priority enterprise aligned with your parish value chain.',
        ]),
      },
      {
        heading: 'Apply for the loan',
        body: pt([
          'Submit your application through the SACCO. Approved applicants access the Parish Revolving Fund at concessional interest.',
        ]),
      },
    ],
    lastReviewedAt: '2026-02-20T00:00:00Z',
    nextReviewDueAt: '2026-08-20T00:00:00Z',
    organisation: { _ref: 'org-mofped' },
  },
];

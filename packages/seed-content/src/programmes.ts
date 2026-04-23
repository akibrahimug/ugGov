import type { Programme } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const programmes: Programme[] = [
  {
    _id: 'prog-pdm',
    _type: 'programme',
    contentId: '8e4a1e80-0002-4000-8000-000000000001',
    title: 'Parish Development Model',
    shortName: 'PDM',
    slug: { current: 'parish-development-model' },
    summary:
      'A whole-of-government programme to move 3.5 million subsistence households into the money economy through parish-level enterprise support.',
    overview: pt([
      'The Parish Development Model (PDM) is the Government of Uganda’s flagship strategy for inclusive socio-economic transformation. It uses the parish as the lowest administrative and planning unit for delivery of interventions to households still operating outside the money economy.',
      { h2: 'Why the parish?' },
      'There are approximately 10,594 parishes in Uganda. By making the parish the delivery unit, PDM brings planning, financing and accountability closer to the citizen than any previous programme.',
      { h2: 'Seven pillars' },
      {
        list: [
          'Production, storage, processing and marketing',
          'Infrastructure and economic services',
          'Financial inclusion (PDM SACCOs)',
          'Social services',
          'Mindset change',
          'Parish-based management information system',
          'Governance and administration',
        ],
      },
    ]),
    eligibility: pt([
      'The PDM targets households in the subsistence economy — those not regularly selling what they produce. Priority is given to women, youth, persons with disabilities, and households in the bottom quintiles.',
    ]),
    howItWorks: pt([
      { h3: '1. Register with your Parish SACCO' },
      'Each parish has a PDM SACCO that serves as the financial vehicle for the Parish Revolving Fund. Visit your parish chief or SACCO office to enrol.',
      { h3: '2. Develop your enterprise plan' },
      'Work with the Parish Development Committee to identify a priority enterprise aligned with the parish value chain.',
      { h3: '3. Apply for a loan' },
      'Qualifying households can access loans from the Parish Revolving Fund at concessional interest.',
      { h3: '4. Receive mentorship' },
      'Extension workers, sub-county Community Development Officers and sector specialists provide follow-up support.',
    ]),
    launchedAt: '2022-02-26',
    budget: 'UGX 1.059 trillion per financial year',
    leadOrganisation: { _ref: 'org-mofped' },
    partnerOrganisations: [
      { _ref: 'org-maaif' },
      { _ref: 'org-opm' },
    ],
    featured: true,
  },
  {
    _id: 'prog-emyooga',
    _type: 'programme',
    contentId: '8e4a1e80-0002-4000-8000-000000000002',
    title: 'Emyooga',
    shortName: 'Emyooga',
    slug: { current: 'emyooga' },
    summary:
      'Presidential Initiative on Wealth and Job Creation that provides seed capital to SACCOs of specialised occupations at the constituency level.',
    overview: pt([
      'Emyooga is a Presidential Initiative that provides seed capital — UGX 30 million to UGX 50 million — to occupational SACCOs formed at the constituency level. It targets 18 categories of enterprise including boda-boda riders, market vendors, women entrepreneurs, youth, salon operators, welders, tailors, carpenters, restaurant operators and performing artists.',
    ]),
    eligibility: pt([
      'Open to Ugandans aged 18 and above who form or join a registered SACCO of their occupational category at the constituency level.',
    ]),
    launchedAt: '2019-08-28',
    leadOrganisation: { _ref: 'org-mofped' },
    featured: true,
  },
  {
    _id: 'prog-sage',
    _type: 'programme',
    contentId: '8e4a1e80-0002-4000-8000-000000000003',
    title: 'Senior Citizens Grant',
    shortName: 'SAGE',
    slug: { current: 'senior-citizens-grant' },
    summary:
      'A monthly universal cash transfer to eligible older persons, delivered under the Social Assistance Grants for Empowerment.',
    overview: pt([
      'The Senior Citizens Grant (SCG) is a Government of Uganda programme that provides a regular, unconditional cash transfer to older persons. It is implemented by the Ministry of Gender, Labour and Social Development through partnerships with local governments.',
      'SCG rolled out nationwide in stages beginning in 2010 and has now scaled to cover all districts of Uganda.',
    ]),
    eligibility: pt([
      'Ugandan citizens who are 80 years of age and above, registered by the sub-county Community Development Officer.',
    ]),
    howItWorks: pt([
      'Eligible citizens receive the grant bi-monthly through mobile money, post office payment or bank transfer, depending on location.',
    ]),
    launchedAt: '2011-06-01',
    leadOrganisation: { _ref: 'org-opm' },
    featured: true,
  },
  {
    _id: 'prog-owc',
    _type: 'programme',
    contentId: '8e4a1e80-0002-4000-8000-000000000004',
    title: 'Operation Wealth Creation',
    shortName: 'OWC',
    slug: { current: 'operation-wealth-creation' },
    summary:
      'Government initiative that distributes agricultural inputs and provides enterprise development support to rural households.',
    overview: pt([
      'Operation Wealth Creation (OWC) supports the commercialisation of agriculture by distributing strategic inputs — improved seed, planting material, livestock and agro-chemicals — to households in every sub-county.',
    ]),
    leadOrganisation: { _ref: 'org-maaif' },
  },
];

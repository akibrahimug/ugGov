import type { NewsArticle } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const news: NewsArticle[] = [
  {
    _id: 'news-001',
    _type: 'news_article',
    contentId: '8e4a1e80-0003-4000-8000-000000000001',
    title: 'Ministry of Health rolls out nationwide malaria vaccination campaign',
    slug: { current: 'ministry-of-health-rolls-out-nationwide-malaria-vaccination-campaign' },
    category: 'news_story',
    summary:
      'The Ministry of Health has begun administering the RTS,S malaria vaccine to children in high-burden districts, starting with the Lango and Busoga sub-regions.',
    body: pt([
      'The Ministry of Health today launched the first phase of Uganda’s national malaria vaccination programme, targeting children aged 5 to 17 months in the Lango and Busoga sub-regions where malaria transmission is highest.',
      'The rollout, which follows WHO prequalification of the RTS,S vaccine and successful implementation in pilot districts, is being delivered through routine immunisation services at health facilities and Village Health Team outreaches.',
      { h2: 'What parents need to know' },
      {
        list: [
          'The vaccine is free of charge at all public health facilities',
          'Four doses are administered between 5 and 24 months of age',
          'The vaccine does not replace other preventive measures — sleep under a treated mosquito net every night',
        ],
      },
    ]),
    publishedAt: '2026-04-18T09:00:00Z',
    organisation: { _ref: 'org-moh' },
  },
  {
    _id: 'news-002',
    _type: 'news_article',
    contentId: '8e4a1e80-0003-4000-8000-000000000002',
    title: 'Parish Development Model reaches 3 million households',
    slug: { current: 'parish-development-model-reaches-3-million-households' },
    category: 'press_release',
    summary:
      'The Ministry of Finance, Planning and Economic Development has announced that the Parish Development Model has disbursed funds to more than 3 million beneficiary households.',
    body: pt([
      'The Parish Development Model (PDM) has now disbursed concessional loans through Parish SACCOs to more than 3 million beneficiary households since its launch in February 2022, the Ministry of Finance has announced.',
      'According to the latest quarterly report, the Parish Revolving Fund has cumulatively disbursed more than UGX 1.4 trillion, with repayment rates exceeding 80% across most regions.',
    ]),
    publishedAt: '2026-04-15T12:00:00Z',
    organisation: { _ref: 'org-mofped' },
  },
  {
    _id: 'news-003',
    _type: 'news_article',
    contentId: '8e4a1e80-0003-4000-8000-000000000003',
    title: 'Coffee export earnings hit record USD 1.4 billion',
    slug: { current: 'coffee-export-earnings-hit-record' },
    category: 'news_story',
    summary:
      'Uganda’s coffee exports earned USD 1.4 billion in the last financial year, the highest on record, driven by higher global prices and increased production.',
    body: pt([
      'Uganda’s coffee sector earned a record USD 1.4 billion in foreign exchange in the financial year ending June, the Ministry of Agriculture has confirmed.',
      'The earnings represent a 35% increase compared with the previous year and confirm Uganda’s position as Africa’s largest coffee exporter.',
      { h2: 'What drove the growth' },
      {
        list: [
          'A 12% increase in export volumes',
          'Favourable global prices, particularly for Robusta',
          'Gains from the Coffee Roadmap interventions',
        ],
      },
    ]),
    publishedAt: '2026-04-10T08:30:00Z',
    organisation: { _ref: 'org-maaif' },
  },
  {
    _id: 'news-004',
    _type: 'news_article',
    contentId: '8e4a1e80-0003-4000-8000-000000000004',
    title: 'President addresses the nation on the State of the Economy',
    slug: { current: 'president-addresses-nation-state-of-economy' },
    category: 'speech',
    summary:
      'H.E. the President of Uganda today delivered the annual State of the Economy address at Parliament, setting out priorities for the coming financial year.',
    body: pt([
      'Mr Speaker, Rt. Hon. Prime Minister, Honourable Members of Parliament, fellow countrymen and women.',
      'Today I address the nation on the state of our economy and the priorities of Government for the financial year ahead.',
      { h2: 'Economic performance' },
      'Uganda’s economy grew by 6.1% in the year under review, above the sub-Saharan African average. Inflation remained within the Bank of Uganda target band. Revenue collection exceeded projection by 4%.',
    ]),
    publishedAt: '2026-04-08T16:00:00Z',
    organisation: { _ref: 'org-state-house' },
  },
  {
    _id: 'news-005',
    _type: 'news_article',
    contentId: '8e4a1e80-0003-4000-8000-000000000005',
    title: 'NIRA extends mass ID renewal exercise by three months',
    slug: { current: 'nira-extends-mass-id-renewal-exercise' },
    category: 'press_release',
    summary:
      'NIRA has extended the nationwide mass enrolment and renewal of National Identification Cards following strong citizen turn-out.',
    body: pt([
      'The National Identification and Registration Authority (NIRA) has announced a three-month extension of the ongoing mass enrolment and renewal exercise, in response to high turnout at parish-level enrolment centres.',
    ]),
    publishedAt: '2026-04-05T10:00:00Z',
    organisation: { _ref: 'org-nira' },
  },
];

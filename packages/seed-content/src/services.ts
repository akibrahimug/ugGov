import type { Service } from '@ug-gov/content-schemas';
import { pt } from './portableText';

export const services: Service[] = [
  {
    _id: 'svc-tin',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000001',
    title: 'Register for a Tax Identification Number (TIN)',
    slug: { current: 'register-for-a-tin' },
    summary:
      'Register online with the Uganda Revenue Authority to obtain a TIN for individuals, businesses or non-individual entities.',
    eligibility: pt([
      'All individuals aged 18 and above, businesses and non-individual entities operating in Uganda are required to register for a TIN.',
    ]),
    howToApply: pt([
      { h3: '1. Prepare your documents' },
      {
        list: [
          'National Identification Card (for citizens)',
          'Valid passport (for non-citizens)',
          'Business registration certificate (for businesses)',
        ],
      },
      { h3: '2. Complete the online form' },
      'Visit the URA web portal and select “TIN Registration”. Complete the e-form and upload scanned copies of your documents.',
      { h3: '3. Receive your TIN' },
      'Upon successful verification you will receive your TIN by email, usually within 1–2 working days.',
    ]),
    startUrl: 'https://www.ura.go.ug',
    startUrlLabel: 'Start now on URA portal',
    deliveredBy: [{ _ref: 'org-ura' }],
    estimatedTime: '10 minutes to apply; 1–2 working days to receive TIN',
    cost: 'Free',
  },
  {
    _id: 'svc-passport',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000002',
    title: 'Apply for a Ugandan passport',
    slug: { current: 'apply-for-a-passport' },
    summary:
      'Apply online with the Directorate of Citizenship and Immigration Control for an ordinary Ugandan passport.',
    eligibility: pt(['Ugandan citizens. Minors must apply with consent of a parent or guardian.']),
    howToApply: pt([
      { h3: '1. Book an appointment' },
      'Book a passport appointment on the Immigration e-services portal.',
      { h3: '2. Prepare your documents' },
      {
        list: [
          'National ID (or birth certificate for minors)',
          'Recent passport photograph',
          'LC1 letter of recommendation',
        ],
      },
      { h3: '3. Pay the fee' },
      'Pay online via the URA gateway or at any commercial bank.',
      { h3: '4. Submit biometrics' },
      'Attend your appointment for biometric capture and collect your passport within 5 working days.',
    ]),
    startUrl: 'https://visas.immigration.go.ug',
    startUrlLabel: 'Start your passport application',
    deliveredBy: [{ _ref: 'org-nira' }],
    estimatedTime: '5 working days',
    cost: 'UGX 250,000 (ordinary 64-page)',
  },
  {
    _id: 'svc-business',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000003',
    title: 'Register a business',
    slug: { current: 'register-a-business' },
    summary:
      'Register a company, business name or partnership with the Uganda Registration Services Bureau.',
    eligibility: pt(['Any person aged 18 or above, or a group of such persons, may register a business.']),
    howToApply: pt([
      'Visit the URSB OBRS portal, reserve a business name, complete the registration form, pay the fees and receive your certificate of incorporation.',
    ]),
    startUrl: 'https://ursb.go.ug',
    startUrlLabel: 'Register on URSB portal',
    deliveredBy: [{ _ref: 'org-mofped' }],
    estimatedTime: '1–3 working days',
    cost: 'From UGX 55,000',
  },
  {
    _id: 'svc-evisa',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000004',
    title: 'Apply for a Ugandan tourist eVisa',
    slug: { current: 'apply-for-a-tourist-evisa' },
    summary:
      'Apply online for a single-entry tourist eVisa to visit Uganda. Approvals typically within 3 working days.',
    eligibility: pt([
      'Foreign nationals (except visa-exempt East African Community partners) travelling to Uganda for tourism.',
    ]),
    howToApply: pt([
      'Complete the online form, upload your passport bio-data page and a recent photograph, pay the USD 50 fee online, and receive your eVisa by email.',
    ]),
    deliveredBy: [{ _ref: 'org-mia' }, { _ref: 'org-nira' }],
    estimatedTime: '3 working days',
    cost: 'USD 50',
  },
  {
    _id: 'svc-driving-permit',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000005',
    title: 'Apply for a driving permit',
    slug: { current: 'apply-for-a-driving-permit' },
    summary:
      'Apply for a new Ugandan driving permit, renew an existing one or change the class of vehicle you are authorised to drive.',
    eligibility: pt([
      'Applicants aged 18 and above who have passed the driving test administered by a licensed driving school.',
    ]),
    howToApply: pt([
      'Book your driving test at any licensed driving school. Once you pass, complete the online application via the URA portal, pay the fee, and present yourself at a Transport Licensing office for biometric capture.',
    ]),
    deliveredBy: [{ _ref: 'org-mowt' }, { _ref: 'org-ura' }],
    estimatedTime: '10 working days after biometric capture',
    cost: 'From UGX 100,000',
  },
  {
    _id: 'svc-register-birth',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000006',
    title: 'Register a birth',
    slug: { current: 'register-a-birth' },
    summary:
      'Register the birth of a child with NIRA. Registration is free if done within 90 days of birth.',
    eligibility: pt([
      'Any child born in Uganda — registration is the right of every child under the Registration of Persons Act, 2015.',
    ]),
    howToApply: pt([
      'Complete the online birth registration form on the NIRA portal, attach supporting documents (notification of birth from the health facility, parents\' IDs), and collect your certificate from a NIRA office or your Local Council.',
    ]),
    deliveredBy: [{ _ref: 'org-nira' }],
    estimatedTime: '5–10 working days',
    cost: 'Free (within 90 days) · UGX 5,000 late registration',
  },
  {
    _id: 'svc-tour-operator',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000007',
    title: 'Apply for a tour operator licence',
    slug: { current: 'apply-for-a-tour-operator-licence' },
    summary:
      'Apply to the Uganda Tourism Board to operate a registered tour company, trekking company or travel agency.',
    eligibility: pt([
      'Registered Ugandan businesses with a trading licence and tax compliance certificate. Tour guides within the business must be certified.',
    ]),
    howToApply: pt([
      'Submit your application to UTB with your certificate of incorporation, tax compliance certificate, and a list of certified guides. A UTB officer will inspect your premises before the licence is issued.',
    ]),
    deliveredBy: [{ _ref: 'org-mtwa' }],
    estimatedTime: '14 working days',
    cost: 'UGX 400,000 (initial) · UGX 200,000 (annual renewal)',
  },
  {
    _id: 'svc-book-hospital',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000008',
    title: 'Book a public hospital appointment',
    slug: { current: 'book-a-hospital-appointment' },
    summary:
      'Book a non-emergency appointment at any national or regional referral hospital through the Ministry of Health booking service.',
    eligibility: pt([
      'Available to all residents of Uganda. Walk-ins are also accepted, but appointments help reduce waiting times.',
    ]),
    howToApply: pt([
      'Select your preferred hospital and department, pick an available slot, and provide your contact details. You will receive an SMS reminder 24 hours before your appointment.',
    ]),
    deliveredBy: [{ _ref: 'org-moh' }],
    estimatedTime: 'Confirmation within minutes',
    cost: 'Free for Ugandan residents',
  },
  {
    _id: 'svc-sage',
    _type: 'service',
    contentId: '8e4a1e80-0006-4000-8000-000000000009',
    title: 'Enrol in the Senior Citizens Grant (SAGE)',
    slug: { current: 'enrol-in-senior-citizens-grant' },
    summary:
      'Enrol an eligible senior citizen aged 80 or above for the monthly Senior Citizens Grant, paid bi-monthly via mobile money, post office or bank.',
    eligibility: pt([
      'Ugandan citizens aged 80 years and above, registered by the sub-county Community Development Officer.',
    ]),
    howToApply: pt([
      'Register with your sub-county Community Development Officer. Bring the senior citizen\'s National ID, a passport-sized photograph and a next-of-kin ID. After verification by the Ministry, grant payments begin within one payment cycle.',
    ]),
    deliveredBy: [{ _ref: 'org-mglsd' }, { _ref: 'org-opm' }],
    estimatedTime: '4–8 weeks from verification',
    cost: 'Free · UGX 25,000 paid monthly',
  },
];

/**
 * Per-service application form configuration.
 * Declarative — the apply page renders whichever config matches the slug.
 */

export type FieldKind =
  | 'text'
  | 'email'
  | 'tel'
  | 'date'
  | 'select'
  | 'textarea'
  | 'nin';

export interface FieldConfig {
  name: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  width?: 'sm' | 'md' | 'lg' | 'full';
  /** Fields sharing the same row key render side-by-side on tablet+. */
  row?: string;
  /** Optional domain check beyond required/format. */
  validator?: (value: string) => string | undefined;
}

export interface FieldsetConfig {
  legend: string;
  hint?: string;
  fields: FieldConfig[];
}

export interface PaymentBreakdown {
  label: string;
  value: string;
}

export interface PaymentConfig {
  amount: string;
  breakdown?: PaymentBreakdown[];
  /** Displayed on the confirmation page. */
  description?: string;
}

export interface ApplyConfig {
  slug: string;
  title: string;
  intro: string;
  estimatedTime: string;
  cost: string;
  fieldsets: FieldsetConfig[];
  /** If present, a Payment step is added at the end of the wizard. */
  payment?: PaymentConfig;
  submitLabel: string;
  referencePrefix: string;
  successTitle: string;
  successLede: string;
  nextSteps: string[];
  externalUrl?: string;
  externalLabel?: string;
}

export const APPLY_CONFIGS: Record<string, ApplyConfig> = {
  'register-for-a-tin': {
    slug: 'register-for-a-tin',
    title: 'Register for a Tax Identification Number',
    intro:
      'Complete this form to apply for a TIN. Your application will be reviewed and your TIN issued, typically within 1–2 working days.',
    estimatedTime: '10 minutes',
    cost: 'Free',
    referencePrefix: 'URA-TIN',
    submitLabel: 'Submit application',
    successTitle: 'Application received',
    successLede:
      'Your TIN application has been submitted. You will receive your TIN by email within 1–2 working days.',
    nextSteps: [
      'Check your email for a confirmation message',
      'Your TIN will be issued within 1–2 working days',
      'Use your TIN for all tax filings and business activity',
    ],
    externalUrl: 'https://www.ura.go.ug',
    externalLabel: 'Use the URA portal',
    fieldsets: [
      {
        legend: 'About you',
        hint: 'Use the details as they appear on your National Identification Card.',
        fields: [
          { name: 'firstName', label: 'First name', kind: 'text', required: true, row: 'name' },
          { name: 'lastName', label: 'Last name', kind: 'text', required: true, row: 'name' },
          {
            name: 'nin',
            label: 'National Identification Number',
            kind: 'nin',
            hint: 'Letters and numbers, up to 12 characters',
            required: true,
            width: 'md',
          },
          { name: 'dob', label: 'Date of birth', kind: 'date', required: true, width: 'sm' },
          { name: 'email', label: 'Email address', kind: 'email', required: true, width: 'lg' },
          {
            name: 'phone',
            label: 'Phone number',
            kind: 'tel',
            required: true,
            width: 'md',
            hint: '+256 701 234 567 or 0701 234 567',
          },
        ],
      },
      {
        legend: 'Taxpayer type',
        fields: [
          {
            name: 'taxpayerType',
            label: 'Type of taxpayer',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Individual – employed', value: 'individual_employed' },
              { label: 'Individual – self-employed', value: 'individual_self' },
              { label: 'Sole proprietor', value: 'sole_proprietor' },
              { label: 'Other', value: 'other' },
            ],
          },
          {
            name: 'businessName',
            label: 'Business name',
            kind: 'text',
            hint: 'Only if you are self-employed or a sole proprietor',
            width: 'lg',
          },
        ],
      },
      {
        legend: 'Address',
        fields: [
          { name: 'district', label: 'District', kind: 'text', required: true, row: 'addr1' },
          { name: 'subCounty', label: 'Sub-county', kind: 'text', required: true, row: 'addr1' },
          { name: 'parish', label: 'Parish', kind: 'text', required: true, row: 'addr2' },
          { name: 'village', label: 'Village', kind: 'text', required: true, row: 'addr2' },
        ],
      },
    ],
  },

  'apply-for-a-passport': {
    slug: 'apply-for-a-passport',
    title: 'Apply for a Ugandan passport',
    intro:
      'Apply for an ordinary Ugandan passport. You will need to attend an appointment for biometric capture.',
    estimatedTime: '15 minutes',
    cost: 'UGX 250,000',
    referencePrefix: 'IMM-PP',
    payment: {
      amount: 'UGX 250,000',
      breakdown: [
        { label: 'Ordinary passport fee (64 pages)', value: 'UGX 250,000' },
        { label: 'Processing fee', value: 'Included' },
      ],
      description: 'UGX 250,000 — ordinary Ugandan passport',
    },
    submitLabel: 'Submit application',
    successTitle: 'Application received',
    successLede:
      'Your passport application has been submitted. You will be invited to book a biometric appointment within 3 working days.',
    nextSteps: [
      'Pay the UGX 250,000 fee at any commercial bank or via URA',
      'Book your biometric appointment at the Immigration office',
      'Collect your passport 5 working days after biometric capture',
    ],
    externalUrl: 'https://visas.immigration.go.ug',
    externalLabel: 'Use the Immigration portal',
    fieldsets: [
      {
        legend: 'Applicant details',
        hint: 'All details must match your National Identification Card.',
        fields: [
          { name: 'firstName', label: 'First name', kind: 'text', required: true, row: 'name' },
          { name: 'middleName', label: 'Middle name', kind: 'text', row: 'name' },
          { name: 'lastName', label: 'Surname', kind: 'text', required: true, row: 'name' },
          {
            name: 'nin',
            label: 'National Identification Number',
            kind: 'nin',
            required: true,
            width: 'md',
          },
          { name: 'dob', label: 'Date of birth', kind: 'date', required: true, row: 'dobsex', width: 'sm' },
          {
            name: 'gender',
            label: 'Gender',
            kind: 'select',
            required: true,
            row: 'dobsex',
            width: 'sm',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Female', value: 'F' },
              { label: 'Male', value: 'M' },
            ],
          },
          { name: 'email', label: 'Email address', kind: 'email', required: true, width: 'lg' },
          {
            name: 'phone',
            label: 'Phone number',
            kind: 'tel',
            required: true,
            width: 'md',
            hint: '+256 701 234 567 or 0701 234 567',
          },
        ],
      },
      {
        legend: 'Passport type',
        fields: [
          {
            name: 'passportType',
            label: 'Type of passport',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Ordinary — 64 pages (UGX 250,000)', value: 'ord_64' },
              { label: 'Ordinary — 50 pages (UGX 250,000)', value: 'ord_50' },
              { label: 'Express — 64 pages (UGX 400,000)', value: 'express' },
            ],
          },
          {
            name: 'reason',
            label: 'Reason for travel',
            kind: 'textarea',
            hint: 'Short description of why you need this passport',
          },
        ],
      },
    ],
  },

  'register-a-business': {
    slug: 'register-a-business',
    title: 'Register a business',
    intro:
      'Register a company, business name or partnership with the Uganda Registration Services Bureau.',
    estimatedTime: '15 minutes',
    cost: 'From UGX 55,000',
    referencePrefix: 'URSB-BR',
    payment: {
      amount: 'UGX 105,000',
      breakdown: [
        { label: 'Name reservation', value: 'UGX 20,000' },
        { label: 'Registration fee', value: 'UGX 55,000' },
        { label: 'Stamp duty', value: 'UGX 30,000' },
      ],
      description: 'UGX 105,000 — URSB business registration fees',
    },
    submitLabel: 'Submit registration',
    successTitle: 'Registration submitted',
    successLede:
      'Your business registration has been received. A URSB officer will review it within 1–3 working days.',
    nextSteps: [
      'You will receive an email with a payment reference',
      'Pay the registration fee at any commercial bank or via URA',
      'Your Certificate of Incorporation will be issued and emailed to you',
    ],
    externalUrl: 'https://ursb.go.ug',
    externalLabel: 'Use the URSB portal',
    fieldsets: [
      {
        legend: 'Business details',
        fields: [
          {
            name: 'entityType',
            label: 'Type of business entity',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Company limited by shares', value: 'company_ltd' },
              { label: 'Business name (sole proprietor)', value: 'business_name' },
              { label: 'Partnership', value: 'partnership' },
            ],
          },
          {
            name: 'proposedName1',
            label: 'Proposed name (first choice)',
            kind: 'text',
            required: true,
            row: 'names',
          },
          {
            name: 'proposedName2',
            label: 'Proposed name (second choice)',
            kind: 'text',
            required: true,
            row: 'names',
            hint: 'If your first choice is unavailable',
          },
          {
            name: 'sector',
            label: 'Primary sector',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Agriculture', value: 'agri' },
              { label: 'Trade', value: 'trade' },
              { label: 'Manufacturing', value: 'mfg' },
              { label: 'Services', value: 'services' },
              { label: 'ICT', value: 'ict' },
              { label: 'Other', value: 'other' },
            ],
          },
          {
            name: 'objectives',
            label: 'Business objectives',
            kind: 'textarea',
            hint: 'A short description of what the business will do',
            required: true,
          },
        ],
      },
      {
        legend: 'Primary owner',
        hint: 'Details of the first director, partner or proprietor.',
        fields: [
          { name: 'ownerName', label: 'Full name', kind: 'text', required: true, width: 'lg' },
          { name: 'ownerNin', label: 'NIN', kind: 'nin', required: true, width: 'md' },
          {
            name: 'ownerEmail',
            label: 'Email address',
            kind: 'email',
            required: true,
            row: 'owner',
          },
          { name: 'ownerPhone', label: 'Phone number', kind: 'tel', required: true, row: 'owner' },
        ],
      },
    ],
  },

  'apply-for-a-tourist-evisa': {
    slug: 'apply-for-a-tourist-evisa',
    title: 'Apply for a Ugandan tourist eVisa',
    intro:
      'Apply online for a single-entry tourist eVisa. Approvals are typically emailed within 3 working days.',
    estimatedTime: '10 minutes',
    cost: 'USD 50',
    referencePrefix: 'UG-EVISA',
    payment: {
      amount: 'USD 50.00',
      breakdown: [
        { label: 'Single-entry tourist eVisa', value: 'USD 50.00' },
      ],
      description: 'USD 50 — single-entry tourist eVisa',
    },
    submitLabel: 'Submit eVisa application',
    successTitle: 'eVisa application received',
    successLede:
      'Your tourist eVisa application has been submitted. Watch your email — approvals usually arrive within 3 working days.',
    nextSteps: [
      'A confirmation email is on its way',
      'Pay the USD 50 fee via the link in the email',
      'Your approved eVisa letter will arrive by email within 3 working days',
      'Print the letter and present it on arrival at your port of entry',
    ],
    fieldsets: [
      {
        legend: 'Your passport',
        hint: 'Details must match the passport you will travel with.',
        fields: [
          { name: 'firstName', label: 'First name', kind: 'text', required: true, row: 'name' },
          { name: 'lastName', label: 'Surname', kind: 'text', required: true, row: 'name' },
          { name: 'passportNumber', label: 'Passport number', kind: 'text', required: true, row: 'pp' },
          { name: 'nationality', label: 'Nationality', kind: 'text', required: true, row: 'pp' },
          { name: 'dob', label: 'Date of birth', kind: 'date', required: true, row: 'ppd' },
          { name: 'passportExpiry', label: 'Passport expiry', kind: 'date', required: true, row: 'ppd' },
        ],
      },
      {
        legend: 'Your trip',
        fields: [
          { name: 'arrivalDate', label: 'Expected arrival date', kind: 'date', required: true, width: 'sm' },
          { name: 'lengthOfStay', label: 'Length of stay (days)', kind: 'text', required: true, width: 'sm' },
          {
            name: 'purpose',
            label: 'Primary purpose',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Tourism / leisure', value: 'tourism' },
              { label: 'Visiting friends / family', value: 'visit' },
              { label: 'Business', value: 'business' },
              { label: 'Transit', value: 'transit' },
            ],
          },
          {
            name: 'accommodation',
            label: 'Accommodation in Uganda',
            kind: 'textarea',
            hint: 'Hotel name, lodge, or host\'s address',
            required: true,
          },
        ],
      },
      {
        legend: 'Contact details',
        fields: [
          { name: 'email', label: 'Email address', kind: 'email', required: true, width: 'lg' },
          { name: 'phone', label: 'Phone number', kind: 'tel', required: true, width: 'md' },
        ],
      },
    ],
  },

  'apply-for-a-driving-permit': {
    slug: 'apply-for-a-driving-permit',
    title: 'Apply for a driving permit',
    intro:
      'Apply for a new driving permit, renew an existing one, or change class. You must have already passed a test at a licensed driving school.',
    estimatedTime: '10 minutes',
    cost: 'From UGX 100,000',
    referencePrefix: 'MOWT-DP',
    payment: {
      amount: 'UGX 125,000',
      breakdown: [
        { label: 'Driving permit fee (3-year)', value: 'UGX 100,000' },
        { label: 'Biometric capture', value: 'UGX 20,000' },
        { label: 'Card production', value: 'UGX 5,000' },
      ],
      description: 'UGX 125,000 — driving permit (3-year)',
    },
    submitLabel: 'Submit permit application',
    successTitle: 'Application received',
    successLede:
      'Your driving permit application has been submitted. A payment reference and biometric appointment will be emailed to you.',
    nextSteps: [
      'Watch your email for a payment reference',
      'Pay the permit fee at any commercial bank or via the URA portal',
      'Attend the biometric capture appointment at the Transport Licensing office',
      'Your permit will be issued 10 working days after biometric capture',
    ],
    fieldsets: [
      {
        legend: 'About you',
        hint: 'All details must match your National ID.',
        fields: [
          { name: 'firstName', label: 'First name', kind: 'text', required: true, row: 'name' },
          { name: 'lastName', label: 'Surname', kind: 'text', required: true, row: 'name' },
          {
            name: 'nin',
            label: 'National Identification Number',
            kind: 'nin',
            required: true,
            width: 'md',
          },
          { name: 'dob', label: 'Date of birth', kind: 'date', required: true, width: 'sm' },
        ],
      },
      {
        legend: 'Permit details',
        fields: [
          {
            name: 'permitAction',
            label: 'What do you need?',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'New permit', value: 'new' },
              { label: 'Renewal', value: 'renewal' },
              { label: 'Upgrade / change class', value: 'upgrade' },
              { label: 'Replacement (lost or damaged)', value: 'replacement' },
            ],
          },
          {
            name: 'permitClass',
            label: 'Permit class',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'A — Motorcycles', value: 'A' },
              { label: 'B — Light vehicles up to 3,500kg', value: 'B' },
              { label: 'C — Commercial light vehicles', value: 'C' },
              { label: 'CE — Heavy goods vehicles', value: 'CE' },
              { label: 'D — Passenger service vehicles', value: 'D' },
            ],
          },
          {
            name: 'drivingSchool',
            label: 'Licensed driving school where you passed your test',
            kind: 'text',
            required: true,
            width: 'lg',
          },
        ],
      },
      {
        legend: 'Contact',
        fields: [
          { name: 'email', label: 'Email address', kind: 'email', required: true, width: 'lg' },
          { name: 'phone', label: 'Phone number', kind: 'tel', required: true, width: 'md' },
        ],
      },
    ],
  },

  'register-a-birth': {
    slug: 'register-a-birth',
    title: 'Register a birth',
    intro:
      'Register the birth of a child with NIRA. Registration is free within 90 days of birth, and protects your child\'s right to an identity.',
    estimatedTime: '10 minutes',
    cost: 'Free (within 90 days)',
    referencePrefix: 'NIRA-BR',
    submitLabel: 'Submit birth registration',
    successTitle: 'Birth registration submitted',
    successLede:
      'The registration has been received by NIRA. Your birth certificate will be ready for collection or digital download within 5–10 working days.',
    nextSteps: [
      'NIRA will verify the notification of birth from the health facility',
      'You will receive a confirmation SMS when the certificate is ready',
      'Collect the certificate from any NIRA office or download it from the NIRA portal',
    ],
    fieldsets: [
      {
        legend: 'The child',
        fields: [
          { name: 'childFirstName', label: 'First name', kind: 'text', required: true, row: 'cname' },
          { name: 'childLastName', label: 'Surname', kind: 'text', required: true, row: 'cname' },
          { name: 'childDob', label: 'Date of birth', kind: 'date', required: true, row: 'cdob' },
          {
            name: 'childSex',
            label: 'Sex',
            kind: 'select',
            required: true,
            row: 'cdob',
            width: 'sm',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Female', value: 'F' },
              { label: 'Male', value: 'M' },
            ],
          },
          { name: 'birthPlace', label: 'Place of birth (hospital or village)', kind: 'text', required: true, width: 'lg' },
          {
            name: 'notificationNumber',
            label: 'Notification of birth number',
            kind: 'text',
            hint: 'Issued by the health facility at birth',
            width: 'md',
          },
        ],
      },
      {
        legend: 'Mother',
        fields: [
          { name: 'motherName', label: 'Full name', kind: 'text', required: true, width: 'lg' },
          { name: 'motherNin', label: 'NIN', kind: 'nin', required: true, width: 'md' },
        ],
      },
      {
        legend: 'Father',
        hint: 'Optional — may be left blank if unknown or undisclosed.',
        fields: [
          { name: 'fatherName', label: 'Full name', kind: 'text', width: 'lg' },
          { name: 'fatherNin', label: 'NIN', kind: 'nin', width: 'md' },
        ],
      },
      {
        legend: 'Informant contact',
        fields: [
          { name: 'email', label: 'Email address', kind: 'email', required: true, width: 'lg' },
          { name: 'phone', label: 'Phone number', kind: 'tel', required: true, width: 'md' },
        ],
      },
    ],
  },

  'enrol-in-senior-citizens-grant': {
    slug: 'enrol-in-senior-citizens-grant',
    title: 'Enrol in the Senior Citizens Grant (SAGE)',
    intro:
      'Register an eligible senior citizen (aged 80+) for the monthly Senior Citizens Grant, paid bi-monthly via mobile money, post office or bank.',
    estimatedTime: '15 minutes',
    cost: 'Free',
    referencePrefix: 'MGLSD-SAGE',
    submitLabel: 'Submit enrolment',
    successTitle: 'Enrolment submitted',
    successLede:
      'The enrolment has been received. A Community Development Officer will visit for verification within 4 weeks; payments begin within one payment cycle thereafter.',
    nextSteps: [
      'A Community Development Officer will contact you within 4 weeks',
      'The officer may visit to verify identity and eligibility',
      'Payments begin in the next payment cycle after verification',
      'Payments arrive bi-monthly — choose your preferred channel on the form',
    ],
    fieldsets: [
      {
        legend: 'The senior citizen',
        hint: 'Use the details as they appear on the National ID.',
        fields: [
          { name: 'seniorFirstName', label: 'First name', kind: 'text', required: true, row: 'sname' },
          { name: 'seniorLastName', label: 'Surname', kind: 'text', required: true, row: 'sname' },
          {
            name: 'seniorNin',
            label: 'National Identification Number',
            kind: 'nin',
            required: true,
            width: 'md',
          },
          { name: 'seniorDob', label: 'Date of birth', kind: 'date', required: true, width: 'sm' },
          { name: 'district', label: 'District of residence', kind: 'text', required: true, row: 'loc' },
          { name: 'subCounty', label: 'Sub-county', kind: 'text', required: true, row: 'loc' },
          { name: 'parish', label: 'Parish', kind: 'text', required: true, row: 'loc2' },
          { name: 'village', label: 'Village', kind: 'text', required: true, row: 'loc2' },
        ],
      },
      {
        legend: 'Payment preference',
        fields: [
          {
            name: 'paymentMethod',
            label: 'How would you like payments?',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Mobile money', value: 'momo' },
              { label: 'Post office (Posta Uganda)', value: 'posta' },
              { label: 'Commercial bank account', value: 'bank' },
            ],
          },
          {
            name: 'paymentAccount',
            label: 'Account / number for payments',
            kind: 'text',
            hint: 'Mobile money number, post office account, or bank account',
            required: true,
            width: 'lg',
          },
        ],
      },
      {
        legend: 'Next of kin',
        hint: 'Someone the Community Development Officer can contact on the senior citizen\'s behalf.',
        fields: [
          { name: 'kinName', label: 'Full name', kind: 'text', required: true, width: 'lg' },
          { name: 'kinRelation', label: 'Relationship', kind: 'text', required: true, row: 'kin', width: 'md' },
          { name: 'kinPhone', label: 'Phone number', kind: 'tel', required: true, row: 'kin', width: 'md' },
        ],
      },
    ],
  },

  'apply-for-a-tour-operator-licence': {
    slug: 'apply-for-a-tour-operator-licence',
    title: 'Apply for a tour operator licence',
    intro:
      'Apply to the Uganda Tourism Board (UTB) to operate a registered tour company, trekking company or travel agency.',
    estimatedTime: '15 minutes',
    cost: 'UGX 400,000 (initial) · UGX 200,000 annual renewal',
    referencePrefix: 'UTB-TOL',
    payment: {
      amount: 'UGX 400,000',
      breakdown: [
        { label: 'Initial licence fee', value: 'UGX 400,000' },
        { label: 'Site inspection', value: 'Included' },
      ],
      description: 'UGX 400,000 — initial tour operator licence',
    },
    submitLabel: 'Submit licence application',
    successTitle: 'Licence application received',
    successLede:
      'Your tour operator licence application has been submitted. A UTB officer will be in touch within 5 working days to arrange a site inspection.',
    nextSteps: [
      'You will receive a confirmation email with a payment reference',
      'Pay the licence fee at any commercial bank or via URA',
      'A UTB officer will arrange a site inspection',
      'Your licence will be issued within 14 working days of a successful inspection',
    ],
    fieldsets: [
      {
        legend: 'Business',
        hint: 'The registered company or business name applying for the licence.',
        fields: [
          { name: 'businessName', label: 'Business name', kind: 'text', required: true, width: 'lg' },
          { name: 'ursbNumber', label: 'URSB registration number', kind: 'text', required: true, row: 'reg' },
          { name: 'tin', label: 'TIN', kind: 'text', required: true, row: 'reg' },
          { name: 'yearEstablished', label: 'Year established', kind: 'text', required: true, width: 'sm' },
          {
            name: 'licenceCategory',
            label: 'Licence category',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Tour operator', value: 'tour_operator' },
              { label: 'Travel agency', value: 'travel_agency' },
              { label: 'Trekking / mountaineering', value: 'trekking' },
              { label: 'Ground transport', value: 'transport' },
            ],
          },
        ],
      },
      {
        legend: 'Services & fleet',
        fields: [
          {
            name: 'servicesOffered',
            label: 'Services you will offer',
            kind: 'textarea',
            hint: 'e.g. gorilla trekking, wildlife safaris, cultural tours…',
            required: true,
          },
          { name: 'fleetSize', label: 'Fleet size (vehicles)', kind: 'text', width: 'sm' },
          {
            name: 'certifiedGuides',
            label: 'Number of certified guides',
            kind: 'text',
            required: true,
            width: 'sm',
          },
          {
            name: 'officeAddress',
            label: 'Physical office address',
            kind: 'textarea',
            hint: 'Used for UTB site inspection',
            required: true,
          },
        ],
      },
      {
        legend: 'Primary contact',
        fields: [
          { name: 'contactName', label: 'Full name', kind: 'text', required: true, width: 'lg' },
          { name: 'contactNin', label: 'NIN', kind: 'nin', required: true, width: 'md' },
          { name: 'contactEmail', label: 'Email', kind: 'email', required: true, row: 'contact' },
          { name: 'contactPhone', label: 'Phone', kind: 'tel', required: true, row: 'contact' },
        ],
      },
    ],
  },

  'book-a-hospital-appointment': {
    slug: 'book-a-hospital-appointment',
    title: 'Book a public hospital appointment',
    intro:
      'Book a non-emergency outpatient appointment at any national or regional referral hospital in Uganda.',
    estimatedTime: '5 minutes',
    cost: 'Free',
    referencePrefix: 'MOH-APP',
    submitLabel: 'Confirm appointment',
    successTitle: 'Appointment booked',
    successLede:
      'Your appointment has been booked. An SMS reminder will be sent 24 hours before the visit.',
    nextSteps: [
      'Save your reference number — you will need it on arrival',
      'Bring your National ID and any previous medical records',
      'Arrive at least 15 minutes before your appointment time',
      'You will receive an SMS reminder 24 hours before the visit',
    ],
    fieldsets: [
      {
        legend: 'Patient',
        hint: 'If booking for someone else, use their details.',
        fields: [
          { name: 'firstName', label: 'First name', kind: 'text', required: true, row: 'name' },
          { name: 'lastName', label: 'Last name', kind: 'text', required: true, row: 'name' },
          {
            name: 'nin',
            label: 'National Identification Number',
            kind: 'nin',
            hint: 'Letters and numbers, up to 12 characters',
            required: true,
            width: 'md',
          },
          { name: 'dob', label: 'Date of birth', kind: 'date', required: true, row: 'dobsex' },
          {
            name: 'sex',
            label: 'Sex',
            kind: 'select',
            required: true,
            row: 'dobsex',
            width: 'sm',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Female', value: 'F' },
              { label: 'Male', value: 'M' },
            ],
          },
          { name: 'phone', label: 'Phone number', kind: 'tel', required: true, width: 'md' },
          { name: 'email', label: 'Email (for reminders)', kind: 'email', width: 'lg' },
        ],
      },
      {
        legend: 'Where & when',
        fields: [
          {
            name: 'hospital',
            label: 'Hospital',
            kind: 'select',
            required: true,
            width: 'lg',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Mulago National Referral Hospital — Kampala', value: 'mulago' },
              { label: 'Butabika National Referral Hospital — Kampala', value: 'butabika' },
              { label: 'Uganda Cancer Institute — Mulago', value: 'uci' },
              { label: 'Uganda Heart Institute — Mulago', value: 'uhi' },
              { label: 'Mbarara Regional Referral Hospital', value: 'mbarara' },
              { label: 'Jinja Regional Referral Hospital', value: 'jinja' },
              { label: 'Gulu Regional Referral Hospital', value: 'gulu' },
              { label: 'Mbale Regional Referral Hospital', value: 'mbale' },
              { label: 'Arua Regional Referral Hospital', value: 'arua' },
              { label: 'Fort Portal Regional Referral Hospital', value: 'fort_portal' },
            ],
          },
          {
            name: 'department',
            label: 'Department',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'General outpatient', value: 'opd' },
              { label: 'Maternal & child health', value: 'mch' },
              { label: 'Dental', value: 'dental' },
              { label: 'Eye clinic', value: 'eye' },
              { label: 'Cardiology', value: 'cardio' },
              { label: 'Paediatrics', value: 'paed' },
              { label: 'Other', value: 'other' },
            ],
          },
          {
            name: 'preferredDate',
            label: 'Preferred date',
            kind: 'date',
            required: true,
            row: 'when',
          },
          {
            name: 'preferredSlot',
            label: 'Preferred time',
            kind: 'select',
            required: true,
            row: 'when',
            width: 'sm',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Morning (8:00–12:00)', value: 'am' },
              { label: 'Afternoon (13:00–17:00)', value: 'pm' },
            ],
          },
        ],
      },
      {
        legend: 'Reason for visit',
        fields: [
          {
            name: 'reason',
            label: 'What is the visit for?',
            kind: 'textarea',
            hint: 'Brief description of symptoms or purpose. Share details you want staff to see before your visit.',
            required: true,
          },
          {
            name: 'urgency',
            label: 'Urgency',
            kind: 'select',
            required: true,
            width: 'md',
            options: [
              { label: 'Please select', value: '' },
              { label: 'Routine — happy with any date', value: 'routine' },
              { label: 'Soon — within the next 2 weeks', value: 'soon' },
              { label: 'Urgent — this week if possible', value: 'urgent' },
            ],
          },
        ],
      },
    ],
  },
};

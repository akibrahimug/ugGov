/**
 * Shared content types — mirror Sanity schemas.
 * Consumed by the frontend for typed GROQ results and by seed fixtures.
 */
import { z } from 'zod';

/* --- Common building blocks --- */

export const SlugSchema = z.object({
  _type: z.literal('slug').optional(),
  current: z.string().min(1),
});

export const ImageRefSchema = z.object({
  _type: z.literal('image'),
  asset: z.object({ _ref: z.string(), _type: z.literal('reference') }),
  alt: z.string().optional(),
});

export const RichTextBlockSchema = z.any();

export const DocumentTypeSchema = z.enum([
  'organisation',
  'person',
  'role',
  'ministerial_role',
  'news_article',
  'speech',
  'publication',
  'consultation',
  'guide',
  'service',
  'programme',
  'topic',
  'collection',
  'location',
  'policy',
]);

export type DocumentType = z.infer<typeof DocumentTypeSchema>;

export const OrganisationKindSchema = z.enum([
  'ministry',
  'department',
  'agency',
  'authority',
  'commission',
  'board',
  'state_house',
  'judiciary',
  'parliament',
  'local_government',
  'public_corporation',
]);

export type OrganisationKind = z.infer<typeof OrganisationKindSchema>;

/* --- Core documents --- */

export const OrganisationSchema = z.object({
  _id: z.string(),
  _type: z.literal('organisation'),
  contentId: z.string().uuid(),
  title: z.string(),
  shortName: z.string().optional(),
  slug: SlugSchema,
  kind: OrganisationKindSchema,
  parent: z.object({ _ref: z.string() }).optional(),
  mandate: z.string(),
  description: z.array(RichTextBlockSchema).optional(),
  logo: ImageRefSchema.optional(),
  brandColor: z.string().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  addressLines: z.array(z.string()).optional(),
  socialLinks: z
    .array(z.object({ platform: z.string(), url: z.string().url() }))
    .optional(),
  featured: z.boolean().optional(),
});

export type Organisation = z.infer<typeof OrganisationSchema>;

export const PersonSchema = z.object({
  _id: z.string(),
  _type: z.literal('person'),
  contentId: z.string().uuid(),
  name: z.string(),
  honorific: z.string().optional(),
  slug: SlugSchema,
  biography: z.array(RichTextBlockSchema).optional(),
  portrait: ImageRefSchema.optional(),
});

export type Person = z.infer<typeof PersonSchema>;

export const RoleSchema = z.object({
  _id: z.string(),
  _type: z.literal('role'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  organisation: z.object({ _ref: z.string() }),
  currentHolder: z.object({ _ref: z.string() }).optional(),
  responsibilities: z.array(RichTextBlockSchema).optional(),
  isMinisterial: z.boolean().optional(),
});

export type Role = z.infer<typeof RoleSchema>;

export const NewsCategorySchema = z.enum([
  'news_story',
  'press_release',
  'speech',
  'statement',
]);

export const NewsArticleSchema = z.object({
  _id: z.string(),
  _type: z.literal('news_article'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  category: NewsCategorySchema,
  summary: z.string(),
  body: z.array(RichTextBlockSchema),
  publishedAt: z.string(),
  organisation: z.object({ _ref: z.string() }),
  author: z.object({ _ref: z.string() }).optional(),
  coverImage: ImageRefSchema.optional(),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;

export const PublicationTypeSchema = z.enum([
  'policy_paper',
  'consultation',
  'statistics',
  'annual_report',
  'budget',
  'act',
  'statutory_instrument',
  'guidance',
  'circular',
  'research',
]);

export const PublicationSchema = z.object({
  _id: z.string(),
  _type: z.literal('publication'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  publicationType: PublicationTypeSchema,
  summary: z.string(),
  body: z.array(RichTextBlockSchema).optional(),
  publishedAt: z.string(),
  organisation: z.object({ _ref: z.string() }),
  attachments: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        fileType: z.string().optional(),
        fileSizeBytes: z.number().optional(),
      }),
    )
    .optional(),
});

export type Publication = z.infer<typeof PublicationSchema>;

export const GuideSchema = z.object({
  _id: z.string(),
  _type: z.literal('guide'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  summary: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      slug: z.string().optional(),
      body: z.array(RichTextBlockSchema),
    }),
  ),
  lastReviewedAt: z.string().optional(),
  nextReviewDueAt: z.string().optional(),
  organisation: z.object({ _ref: z.string() }),
});

export type Guide = z.infer<typeof GuideSchema>;

export const ServiceSchema = z.object({
  _id: z.string(),
  _type: z.literal('service'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  summary: z.string(),
  eligibility: z.array(RichTextBlockSchema),
  howToApply: z.array(RichTextBlockSchema),
  startUrl: z.string().url().optional(),
  startUrlLabel: z.string().optional(),
  deliveredBy: z.array(z.object({ _ref: z.string() })),
  estimatedTime: z.string().optional(),
  cost: z.string().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const ProgrammeSchema = z.object({
  _id: z.string(),
  _type: z.literal('programme'),
  contentId: z.string().uuid(),
  title: z.string(),
  shortName: z.string().optional(),
  slug: SlugSchema,
  summary: z.string(),
  overview: z.array(RichTextBlockSchema),
  eligibility: z.array(RichTextBlockSchema).optional(),
  howItWorks: z.array(RichTextBlockSchema).optional(),
  launchedAt: z.string().optional(),
  budget: z.string().optional(),
  leadOrganisation: z.object({ _ref: z.string() }),
  partnerOrganisations: z.array(z.object({ _ref: z.string() })).optional(),
  coverImage: ImageRefSchema.optional(),
  featured: z.boolean().optional(),
});

export type Programme = z.infer<typeof ProgrammeSchema>;

export const LocationKindSchema = z.enum(['city', 'district', 'municipality', 'sub_county']);

export const LocationSchema = z.object({
  _id: z.string(),
  _type: z.literal('location'),
  contentId: z.string().uuid(),
  name: z.string(),
  slug: SlugSchema,
  kind: LocationKindSchema,
  region: z.enum(['Central', 'Eastern', 'Northern', 'Western']),
  parent: z.object({ _ref: z.string() }).optional(),
  population: z.number().optional(),
  headquarters: z.string().optional(),
});

export type Location = z.infer<typeof LocationSchema>;

export const TopicSchema = z.object({
  _id: z.string(),
  _type: z.literal('topic'),
  contentId: z.string().uuid(),
  title: z.string(),
  slug: SlugSchema,
  description: z.string().optional(),
});

export type Topic = z.infer<typeof TopicSchema>;

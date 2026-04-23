import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField } from './_shared';

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Programme name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'shortName', title: 'Acronym', type: 'string' }),
    slugField('title'),
    defineField({
      name: 'summary',
      title: 'One-line summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(280),
    }),
    { ...richTextField, name: 'overview', title: 'Overview' } as never,
    { ...richTextField, name: 'eligibility', title: 'Who can benefit' } as never,
    { ...richTextField, name: 'howItWorks', title: 'How it works' } as never,
    defineField({ name: 'launchedAt', title: 'Launched', type: 'date' }),
    defineField({ name: 'budget', title: 'Budget', type: 'string' }),
    defineField({
      name: 'leadOrganisation',
      title: 'Lead organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnerOrganisations',
      title: 'Partner organisations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'organisation' }] }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'shortName', media: 'coverImage' } },
});

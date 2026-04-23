import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField } from './_shared';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Service name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'summary',
      title: 'One-line summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(280),
    }),
    { ...richTextField, name: 'eligibility', title: 'Who can use this' } as never,
    { ...richTextField, name: 'howToApply', title: 'How to apply' } as never,
    defineField({ name: 'startUrl', title: 'Start URL', type: 'url' }),
    defineField({
      name: 'startUrlLabel',
      title: 'Start button label',
      type: 'string',
      initialValue: 'Start now',
    }),
    defineField({
      name: 'deliveredBy',
      title: 'Delivered by',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'organisation' }] }],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: 'estimatedTime', title: 'Typical time to complete', type: 'string' }),
    defineField({ name: 'cost', title: 'Cost', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary' } },
});

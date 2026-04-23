import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField, organisationReference } from './_shared';

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (rule) => rule.min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Section heading',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            { name: 'slug', title: 'Anchor slug', type: 'string' },
            { ...richTextField, name: 'body', title: 'Content' } as never,
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last reviewed',
      type: 'datetime',
    }),
    defineField({
      name: 'nextReviewDueAt',
      title: 'Next review due',
      type: 'datetime',
    }),
    organisationReference,
  ],
  preview: { select: { title: 'title', subtitle: 'organisation.title' } },
});

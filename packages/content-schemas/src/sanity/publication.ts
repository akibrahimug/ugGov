import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField, organisationReference } from './_shared';

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
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
      name: 'publicationType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Policy paper', value: 'policy_paper' },
          { title: 'Consultation', value: 'consultation' },
          { title: 'Statistics', value: 'statistics' },
          { title: 'Annual report', value: 'annual_report' },
          { title: 'Budget', value: 'budget' },
          { title: 'Act', value: 'act' },
          { title: 'Statutory instrument', value: 'statutory_instrument' },
          { title: 'Guidance', value: 'guidance' },
          { title: 'Circular', value: 'circular' },
          { title: 'Research', value: 'research' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    richTextField,
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    organisationReference,
    defineField({
      name: 'attachments',
      title: 'Attached documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'url', type: 'url', title: 'File URL' },
            { name: 'fileType', type: 'string', title: 'Format (e.g. PDF)' },
            { name: 'fileSizeBytes', type: 'number', title: 'Size (bytes)' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publicationType', date: 'publishedAt' },
  },
});

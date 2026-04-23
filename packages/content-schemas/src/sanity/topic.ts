import { defineField, defineType } from 'sanity';
import { contentIdField, slugField } from './_shared';

export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Topic',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title'),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'title' } },
});

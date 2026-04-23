import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField } from './_shared';

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'honorific',
      title: 'Honorific (e.g. Hon., Dr., Rt. Hon.)',
      type: 'string',
    }),
    slugField('name'),
    { ...richTextField, name: 'biography', title: 'Biography' } as never,
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'honorific', media: 'portrait' } },
});

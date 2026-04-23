import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField } from './_shared';

export const role = defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currentHolder',
      title: 'Current holder',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    { ...richTextField, name: 'responsibilities', title: 'Responsibilities' } as never,
    defineField({
      name: 'isMinisterial',
      title: 'Is a ministerial role?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'organisation.title' } },
});

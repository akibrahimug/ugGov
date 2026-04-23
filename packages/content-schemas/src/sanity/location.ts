import { defineField, defineType } from 'sanity';
import { contentIdField, slugField } from './_shared';

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('name'),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'City', value: 'city' },
          { title: 'District', value: 'district' },
          { title: 'Municipality', value: 'municipality' },
          { title: 'Sub-county', value: 'sub_county' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: ['Central', 'Eastern', 'Northern', 'Western'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent location',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({ name: 'population', title: 'Population (latest)', type: 'number' }),
    defineField({ name: 'headquarters', title: 'Administrative HQ', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'kind' } },
});

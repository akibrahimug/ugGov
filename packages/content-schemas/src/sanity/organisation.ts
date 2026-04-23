import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField } from './_shared';

export const organisation = defineType({
  name: 'organisation',
  title: 'Organisation',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Official name',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'shortName',
      title: 'Short name / acronym',
      type: 'string',
      description: 'e.g. MoH, MAAIF, URA',
    }),
    slugField('title'),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ministry', value: 'ministry' },
          { title: 'Department', value: 'department' },
          { title: 'Agency', value: 'agency' },
          { title: 'Authority', value: 'authority' },
          { title: 'Commission', value: 'commission' },
          { title: 'Board', value: 'board' },
          { title: 'State House', value: 'state_house' },
          { title: 'Judiciary', value: 'judiciary' },
          { title: 'Parliament', value: 'parliament' },
          { title: 'Local government', value: 'local_government' },
          { title: 'Public corporation', value: 'public_corporation' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
      description: 'If this body sits under a ministry',
    }),
    defineField({
      name: 'mandate',
      title: 'Mandate (one sentence)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(280),
    }),
    { ...richTextField, name: 'description', title: 'About' } as never,
    defineField({
      name: 'logo',
      title: 'Logo / crest',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'brandColor',
      title: 'Brand accent colour',
      type: 'string',
      description: 'Hex colour used for the organisation header stripe. Optional.',
    }),
    defineField({ name: 'website', title: 'External website', type: 'url' }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Contact phone', type: 'string' }),
    defineField({
      name: 'addressLines',
      title: 'Physical address',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind', media: 'logo' },
  },
});

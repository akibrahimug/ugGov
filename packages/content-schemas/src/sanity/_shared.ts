import { defineField } from 'sanity';

export const contentIdField = defineField({
  name: 'contentId',
  title: 'Content ID',
  description:
    'Permanent UUID — stable across URL changes. Do not edit after creation. Auto-generated on new documents.',
  type: 'string',
  readOnly: ({ value }) => Boolean(value),
  validation: (rule) => rule.required(),
});

export const slugField = (source = 'title') =>
  defineField({
    name: 'slug',
    title: 'URL slug',
    type: 'slug',
    options: {
      source,
      maxLength: 96,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .trim()
          .replace(/['’]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 96),
    },
    validation: (rule) => rule.required(),
  });

export const richTextField = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) => rule.required(),
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'organisation' },
                  { type: 'guide' },
                  { type: 'service' },
                  { type: 'programme' },
                  { type: 'publication' },
                  { type: 'news_article' },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
});

export const organisationReference = defineField({
  name: 'organisation',
  title: 'Owning organisation',
  type: 'reference',
  to: [{ type: 'organisation' }],
  validation: (rule) => rule.required(),
});

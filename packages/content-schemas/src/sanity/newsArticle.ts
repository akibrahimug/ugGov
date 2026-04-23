import { defineField, defineType } from 'sanity';
import { contentIdField, slugField, richTextField, organisationReference } from './_shared';

export const newsArticle = defineType({
  name: 'news_article',
  title: 'News article',
  type: 'document',
  fields: [
    contentIdField,
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(180),
    }),
    slugField('title'),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News story', value: 'news_story' },
          { title: 'Press release', value: 'press_release' },
          { title: 'Speech', value: 'speech' },
          { title: 'Statement', value: 'statement' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(320),
    }),
    richTextField,
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    organisationReference,
    defineField({
      name: 'author',
      title: 'Author (person)',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
  ],
  orderings: [
    {
      title: 'Published, newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organisation.title',
      date: 'publishedAt',
      media: 'coverImage',
    },
  },
});

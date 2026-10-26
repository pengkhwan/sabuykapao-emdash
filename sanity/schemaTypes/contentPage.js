import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentPage',
  title: 'Content Page (Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Content Page Settings',
      }
    },
  },
})

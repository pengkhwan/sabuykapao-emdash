import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'menu', title: 'Main Menu' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'array',
      group: 'menu',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url'
            }
          }
        }
      ]
    }),

    // --- Footer Section ---
    defineField({
      name: 'footerAboutTitle',
      title: 'About Column Title',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerAboutText',
      title: 'About Column Text',
      type: 'text',
      rows: 4,
      group: 'footer',
    }),
    defineField({
      name: 'footerProductTitle',
      title: 'Product Column Title',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerProductLinks',
      title: 'Product Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Text' },
            { name: 'href', type: 'string', title: 'Link URL' },
          ]
        }
      ]
    }),
    defineField({
      name: 'footerArticleTitle',
      title: 'Article Column Title',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerArticleLinks',
      title: 'Article Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Text' },
            { name: 'href', type: 'string', title: 'Link URL' },
          ]
        }
      ]
    }),
    defineField({
      name: 'footerSocialTitle',
      title: 'Social Column Title',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'Line', value: 'line' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ]
              }
            },
            { name: 'url', type: 'string', title: 'URL' }
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Text' },
            { name: 'href', type: 'string', title: 'Link URL' },
          ]
        }
      ]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'philosophy', title: 'Philosophy Section' },
    { name: 'materials', title: 'Materials Section' },
    { name: 'craftsmanship', title: 'Craftsmanship Section' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // --- Hero Section ---
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      group: 'hero',
      description: 'หัวข้อหลัก (เช่น "เรื่องราวของเรา")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text',
      rows: 4,
      group: 'hero',
      description: 'เนื้อหาเกี่ยวกับเรื่องราวของร้าน',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        })
      ]
    }),

    // --- Philosophy Section ---
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Title',
      type: 'string',
      group: 'philosophy',
      description: 'หัวข้อปรัชญา (เช่น "มากกว่างานฝีมือ คือปรัชญาของเรา")',
    }),
    defineField({
      name: 'philosophyItems',
      title: 'Philosophy Items',
      type: 'array',
      group: 'philosophy',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Quality (Shield/Check)', value: 'quality' },
                  { title: 'Design (Pen/Tool)', value: 'design' },
                  { title: 'Detail (Magnifying Glass/Heart)', value: 'detail' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        })
      ],
    }),

    // --- Materials Section ---
    defineField({
      name: 'materialsTitle',
      title: 'Materials Title',
      type: 'string',
      group: 'materials',
      description: 'หัวข้อวัสดุ (เช่น "วัตถุดิบที่เราเลือก")',
    }),
    defineField({
      name: 'materialsList',
      title: 'Materials List',
      type: 'array',
      group: 'materials',
      of: [
        defineField({
          name: 'item',
          title: 'List Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title (Bold text)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        })
      ],
    }),
    defineField({
      name: 'materialsImage',
      title: 'Materials Image',
      type: 'image',
      group: 'materials',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        })
      ]
    }),

    // --- Craftsmanship Section ---
    defineField({
      name: 'craftsmanshipTitle',
      title: 'Craftsmanship Title',
      type: 'string',
      group: 'craftsmanship',
      description: 'หัวข้องานฝีมือ (เช่น "ความประณีตในทุกฝีเข็ม")',
    }),
    defineField({
      name: 'craftsmanshipList',
      title: 'Craftsmanship List',
      type: 'array',
      group: 'craftsmanship',
      of: [
        defineField({
          name: 'item',
          title: 'List Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title (Bold text)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        })
      ],
    }),
    defineField({
      name: 'craftsmanshipImage',
      title: 'Craftsmanship Image',
      type: 'image',
      group: 'craftsmanship',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        })
      ]
    }),

    // --- SEO Fields ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Image (Open Graph)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'headerTitle',
    },
    prepare({title}) {
      return {
        title: title || 'About Page Settings',
      }
    },
  },
})

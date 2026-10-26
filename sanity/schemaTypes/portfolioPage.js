import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page Settings',
  type: 'document',
  groups: [
    { name: 'content', title: 'เนื้อหา', default: true },
    { name: 'contact', title: 'ติดต่อ' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'ชื่อหลักของหน้า portfolio',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 6,
      description: 'คำอธิบายของหน้า portfolio (จะแสดงใต้ชื่อหลัก)',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      description: 'หัวข้อของส่วนติดต่อ (เช่น "สนใจสั่งทำชิ้นงานพิเศษของคุณเอง?")',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contactDescription',
      title: 'Contact Section Description',
      type: 'text',
      rows: 4,
      description: 'คำอธิบายของส่วนติดต่อ',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      group: 'contact',
      of: [
        defineField({
          name: 'contactLink',
          title: 'Contact Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LINE', value: 'line' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Email', value: 'email' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              description: 'ข้อความบนปุ่ม (เช่น "สอบถามทาง Line")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL / Link',
              type: 'string',
              description: 'ลิงก์ไปยังตำแหน่งติดต่อ (เช่น https://line.me/R/ti/p/... หรือ https://m.me/...)',
              validation: (Rule) =>
                Rule.required()
                  .uri({
                    allowRelative: false,
                    scheme: ['http', 'https', 'tel', 'mailto'],
                  }),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              label: 'label',
            },
            prepare({platform, label}) {
              return {
                title: `${platform?.toUpperCase()} - ${label}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // --- SEO Fields ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'ชื่อที่จะแสดงในแท็บเบราว์เซอร์ (แนะนำ 50-60 ตัวอักษร)',
      validation: (Rule) => Rule.max(60).warning('ควรไม่เกิน 60 ตัวอักษร'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Meta Description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'คำอธิบายสำหรับ Google Search (แนะนำ 150-160 ตัวอักษร)',
      validation: (Rule) => Rule.max(160).warning('ควรไม่เกิน 160 ตัวอักษร'),
    }),

    defineField({
      name: 'ogImage',
      title: 'Social Image (Open Graph)',
      type: 'image',
      group: 'seo',
      description: 'รูปภาพที่จะแสดงเมื่อแชร์ลิงก์บน Facebook / Social Media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'คำอธิบายรูปภาพ',
        })
      ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
      seoTitle: 'seoTitle',
    },
    prepare({title, seoTitle}) {
      return {
        title: title || 'Portfolio Page Settings',
        subtitle: seoTitle ? `SEO: ${seoTitle}` : 'ยังไม่มี SEO Title',
      }
    },
  },
})

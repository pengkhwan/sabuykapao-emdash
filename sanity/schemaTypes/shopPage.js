import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopPage',
  title: 'Shop Page Settings',
  type: 'document',
  groups: [
    { name: 'content', title: 'เนื้อหา', default: true },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'ชื่อหลักของหน้า shop (จะแสดงใต้ heading)',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 4,
      description: 'คำอธิบายของหน้า shop (จะแสดงใต้ชื่อหลัก)',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // --- SEO Fields ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      group: 'seo',
      description: 'ชื่อที่จะแสดงในแท็บเบราว์เซอร์และ Google Search (แนะนำ 50-60 ตัวอักษร)',
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
        title: title || 'Shop Page Settings',
        subtitle: seoTitle ? `SEO: ${seoTitle}` : 'ยังไม่มี SEO Title',
      }
    },
  },
})

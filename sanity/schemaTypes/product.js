import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'sku',
      title: 'SKU (Stock Keeping Unit)',
      type: 'string',
      description: 'รหัสสินค้าที่ใช้ในการจัดการสต็อกและอ้างอิง',
      validation: (Rule) =>
        Rule.required().min(3).max(20).warning('SKU ควรยาว 3-20 ตัวอักษร'),
      placeholder: 'เช่น BAG-001, WALLET-2024',
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'คำอธิบายสั้นๆ สำหรับแสดงผลในหน้าลิสต์สินค้า',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'คำอธิบายรูปภาพสำหรับ SEO (สำคัญมาก)',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      description: 'รูปภาพเพิ่มเติมสำหรับแสดงใน Gallery',
      // [แก้ไข] ปรับโครงสร้างให้ถูกต้องตามมาตรฐาน
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'คำอธิบายรูปภาพสำหรับ SEO (สำคัญมาก)',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive('ราคาต้องเป็นค่าบวก'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'mainKeyword',
      title: 'Main Keyword',
      type: 'string',
      description: 'คีย์เวิร์ดหลักสำหรับสินค้านี้ (ใช้สำหรับ SEO หรือการค้นหา)',
    }),
    defineField({
      name: 'description',
      title: 'Full Description (Markdown)',
      type: 'markdown',
      description: 'เนื้อหาสินค้าในรูปแบบ Markdown (เหมือนบทความ)',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (คำถามที่พบบ่อย)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', type: 'string', title: 'Question'}),
            defineField({name: 'answer', type: 'text', title: 'Answer', rows: 3}),
          ],
        },
      ],
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'shopeeUrl',
      title: 'Shopee URL',
      type: 'url',
    }),
    defineField({
      name: 'lazadaUrl',
      title: 'Lazada URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'TikTok Shop URL',
      type: 'url',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo', // Assumes 'seo' is a custom object type defined elsewhere
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sku',
      media: 'image',
    },
  },
})
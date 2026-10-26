// sanity/schemaTypes/category.js
import {defineField, defineType} from 'sanity'
import seo from './seo'

export default defineType({
  // --- ใช้ defineType ครอบ schema ทั้งหมด ---
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    // --- ใช้ defineField สำหรับแต่ละฟิลด์ ---
    defineField({
      name: 'title', // <-- ปรับจาก 'name' เป็น 'title' ตามมาตรฐาน
      title: 'Category Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // <-- อัปเดต source ให้ตรงกับ field ใหม่
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'คำอธิบายสั้นๆ เกี่ยวกับหมวดหมู่นี้ (สำคัญต่อ SEO และผู้ใช้งาน)',
      rows: 4,
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description (ใช้ที่หน้า /shop)',
      type: 'text',
      description: 'คำอธิบายสั้นๆ แสดงใต้รูปหมวดหมู่ที่หน้า /shop (แนะนำ 50-80 ตัวอักษร)',
      rows: 3,
      validation: (Rule) => Rule.max(150).warning('ควรไม่เกิน 150 ตัวอักษร'),
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      description: 'รูปหมวดหมู่ (ใช้ที่หน้า /shop และหน้า category)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text (Alt Text)',
          type: 'string',
          description: 'คำอธิบายรูปภาพสำหรับ SEO และการเข้าถึง',
          validation: (Rule) => Rule.required().min(3).warning('ควรใส่ alt text อย่างน้อย 3 ตัวอักษร'),
        }),
      ],
    }),

    defineField({
      name: 'categoryHeader',
      title: 'Category Header Section',
      type: 'object',
      description: 'ส่วนหัวของหน้า category (h1 + description)',
      fields: [
        defineField({
          name: 'title',
          title: 'Header Title (h1)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Header Description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'categoryDetails',
      title: 'Category Details Section (ท้ายหน้า)',
      type: 'array',
      description: 'Sections ที่แสดงท้ายหน้า (สามารถเพิ่มได้หลายๆ section)',
      of: [
        defineField({
          name: 'detailSection',
          title: 'Detail Section',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading (h2)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Section Content',
              type: 'text',
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'content',
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.subtitle?.slice(0, 60) + '...' || 'ไม่มีเนื้อหา',
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
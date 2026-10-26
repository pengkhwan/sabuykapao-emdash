import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactUsPage',
  title: 'Contact Us Page Settings',
  type: 'document',
  groups: [
    { name: 'header', title: 'ส่วนหัว', default: true },
    { name: 'contact', title: 'ข้อมูลติดต่อ' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // --- Header Section ---
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      group: 'header',
      description: 'หัวข้อหลักของหน้า (เช่น "ติดต่อเรา")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text',
      rows: 3,
      group: 'header',
      description: 'คำอธิบายใต้หัวข้อ',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'header',
      description: 'รูปภาพปกหรือรูปหน้าร้าน (ถ้าไม่ใส่จะใช้รูป Default)',
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

    // --- Contact Information ---
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'string',
      group: 'contact',
      description: 'เว็บไซต์ (เช่น sabuykapao.com)',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'facebook',
      title: 'Facebook ID / URL',
      type: 'string',
      group: 'contact',
      description: 'ID หรือ URL ของ Facebook (เช่น marah5g)',
    }),

    defineField({
      name: 'line',
      title: 'LINE ID',
      type: 'string',
      group: 'contact',
      description: 'LINE ID (เช่น @marah5g)',
    }),

    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      group: 'contact',
      of: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: 'เบอร์โทร (เช่น 084-0954445)',
        })
      ],
      description: 'เบอร์โทรศัพท์ที่สามารถติดต่อได้',
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
      description: 'ที่อยู่ที่สมบูรณ์',
    }),

    defineField({
      name: 'addressNote',
      title: 'Address Note',
      type: 'string',
      group: 'contact',
      description: 'หมายเหตุที่อยู่ (เช่น "ใกล้ตลาดน้ำดำเนินสะดวก")',
    }),

    defineField({
      name: 'googleMapUrl',
      title: 'Google Map Link',
      type: 'string',
      group: 'contact',
      description: 'ลิงค์สำหรับปุ่ม "ดูเส้นทางใน Google Map" (เช่น https://maps.app.goo.gl/...)',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      group: 'contact',
      of: [
        defineField({
          name: 'hours',
          title: 'Hours',
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day(s)',
              type: 'string',
              description: 'วัน (เช่น "จันทร์ - เสาร์")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'เวลา (เช่น "8:00 – 17:00")',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              day: 'day',
              time: 'time',
            },
            prepare({day, time}) {
              return {
                title: `${day}: ${time}`,
              }
            },
          },
        })
      ],
      description: 'เวลาทำการ',
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
      headerTitle: 'headerTitle',
      website: 'website',
    },
    prepare({headerTitle, website}) {
      return {
        title: headerTitle || 'Contact Us Page Settings',
        subtitle: website ? `Website: ${website}` : 'ยังไม่มีข้อมูลติดต่อ',
      }
    },
  },
})

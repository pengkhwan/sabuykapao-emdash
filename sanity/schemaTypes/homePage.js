import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'category', title: 'Category Section' },
    { name: 'showcase', title: 'Showcase Section' },
    { name: 'crafting', title: 'Crafting Section' },
    { name: 'customOrder', title: 'Custom Order Section' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- Hero Section ---
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
      type: 'string',
      group: 'hero',
    }),

    // --- Category Section ---
    defineField({
      name: 'categoryTitle',
      title: 'Category Title',
      type: 'string',
      group: 'category',
    }),
    defineField({
      name: 'categoryDescription',
      title: 'Category Description',
      type: 'text',
      rows: 2,
      group: 'category',
    }),

    // --- Showcase Section ---
    defineField({
      name: 'showcaseTitle',
      title: 'Showcase Title',
      type: 'string',
      group: 'showcase',
    }),
    defineField({
      name: 'showcaseDescription',
      title: 'Showcase Description',
      type: 'text',
      rows: 2,
      group: 'showcase',
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      group: 'showcase',
    }),

    // --- Crafting Section ---
    defineField({
      name: 'craftingTitle',
      title: 'Crafting Title',
      type: 'string',
      group: 'crafting',
    }),
    defineField({
      name: 'craftingDescription',
      title: 'Crafting Description',
      type: 'text',
      rows: 3,
      group: 'crafting',
    }),
    defineField({
      name: 'craftingImage',
      title: 'Crafting Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      group: 'crafting',
    }),
    defineField({
      name: 'craftingCtaText',
      title: 'Crafting CTA Text',
      type: 'string',
      group: 'crafting',
    }),
    defineField({
      name: 'craftingCtaLink',
      title: 'Crafting CTA Link',
      type: 'string',
      group: 'crafting',
    }),

    // --- Custom Order Section ---
    defineField({
      name: 'customOrderTitle',
      title: 'Custom Order Title',
      type: 'string',
      group: 'customOrder',
    }),
    defineField({
      name: 'customOrderDescription',
      title: 'Custom Order Description',
      type: 'text',
      rows: 3,
      group: 'customOrder',
    }),
    defineField({
      name: 'customOrderImage',
      title: 'Custom Order Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      group: 'customOrder',
    }),
    defineField({
      name: 'customOrderCtaText',
      title: 'Custom Order CTA Text',
      type: 'string',
      group: 'customOrder',
    }),
    defineField({
      name: 'customOrderCtaLink',
      title: 'Custom Order CTA Link',
      type: 'string',
      group: 'customOrder',
    }),

    // --- Testimonials ---
    defineField({
      name: 'testimonialTitle',
      title: 'Testimonial Title',
      type: 'string',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials List',
      type: 'array',
      group: 'testimonials',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote' },
            { name: 'author', type: 'string', title: 'Author' },
          ]
        }
      ]
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Settings',
      }
    },
  },
})

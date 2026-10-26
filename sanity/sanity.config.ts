// sanity/sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {markdownSchema} from 'sanity-plugin-markdown'
import {media} from 'sanity-plugin-media'

// schema หลัก
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'SabuyKapao',

  projectId: 'ik92gukm',
  dataset: 'production',

  plugins: [
    deskTool(), 
    visionTool(), 
    markdownSchema(),
    media() // เพิ่ม Media Library
  ],

  schema: {
    types: schemaTypes,
  },
})

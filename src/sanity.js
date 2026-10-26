import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ik92gukm',
  dataset: 'production',
  apiVersion: '2024-08-22',
  useCdn: true,
  // token: process.env.SANITY_API_TOKEN, // ไม่จำเป็นต้องใช้ token สำหรับ public data
});
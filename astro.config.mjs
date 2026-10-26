import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import purgecss from 'astro-purgecss';
import critters from 'astro-critters';
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  // เพิ่ม: กำหนด site URL ของคุณที่นี่
  site: 'https://sabuykapao.com',
  // ตั้งค่า trailingSlash เพื่อหลีกเลี่ยง 308 redirect
  trailingSlash: 'never',
  // บังคับให้สร้างไฟล์แบบ flat (chest-bag.html แทน chest-bag/index.html)
  build: {
    format: 'file',
    inlineStylesheets: 'auto', // Inline small CSS automatically for better performance
  },
  integrations: [
    svelte(), 
    sitemap({
      filter: (page) => {
        // เอาหน้า pagination ออกจาก sitemap (เช่น /content/2, /content/3, ...)
        // เก็บไว้แค่หน้าหลัก /content/ เท่านั้น
        const paginationPattern = /\/content\/\d+\/?$/;
        return !paginationPattern.test(page);
      },
      serialize(item) {
        // กำหนด Priority และ Change Frequency ตามประเภทหน้า
        const url = item.url;
        
        // หน้าแรก - สำคัญที่สุด
        if (url === 'https://sabuykapao.com/' || url === 'https://sabuykapao.com') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } 
        // หน้าหมวดหมู่สินค้า - สำคัญมาก
        else if (url.match(/\/(shop|wallet|backpack|handbag|shoulder-bag|chest-bag|belt|keychain|etc)$/)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } 
        // หน้าบทความ/เนื้อหา
        else if (url.includes('/content')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } 
        // หน้าผลงาน
        else if (url.includes('/portfolio')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // หน้าเกี่ยวกับ/ติดต่อ/นโยบาย
        else if (url.match(/\/(about|contact-us|privacy-policy|terms-and-conditions|refund-policy)$/)) {
          item.priority = 0.5;
          item.changefreq = 'yearly';
        } 
        // หน้าสินค้า/บทความแต่ละรายการ (dynamic pages)
        else {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        
        return item;
      }
    }), 
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
    // Performance Optimizations
    purgecss({
      // ลบ CSS ที่ไม่ได้ใช้ออกจาก bundle
      // โดยอัตโนมัติตรวจสอบ class ที่ใช้จริงใน HTML
      safelist: {
        // เก็บ class เหล่านี้ไว้เสมอ (สำหรับ dynamic classes)
        standard: ['astro-'],
        // เก็บ class ที่มี pattern นี้
        greedy: [/data-/, /swiper/],
      },
    }),
    critters({
      // Inline critical CSS เข้าไปใน <head> เพื่อปรับปรุง FCP/LCP
      // ลด render-blocking CSS
    }),
    compress({
      // Compress ทุกอย่างหลัง build (ต้องอยู่ท้ายสุด)
      CSS: true,        // Minify CSS
      HTML: true,       // Minify HTML
      Image: false,     // ปิด - ภาพบีบอัดไว้แล้วจาก Sanity CDN (หลีกเลี่ยง double compression)
      JavaScript: true, // Minify JS
      SVG: true,        // Optimize SVG (เฉพาะ icons ใน /public)
    }),
  ],
});
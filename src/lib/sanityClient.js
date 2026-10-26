// /src/lib/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity Client
 * - ใช้สำหรับดึงข้อมูลลิสต์ (หมวด/บทความ) ฝั่ง SSG
 * - คงค่าจากโปรเจกต์เดิมไว้
 */
export const client = createClient({
  projectId: "ik92gukm",
  dataset: "production",
  apiVersion: "2024-08-22",
  useCdn: false, // คงไว้ตามเดิม (ถ้าอยากเร่ง build cache ค่อยเปลี่ยนเป็น true)
  perspective: "published",
});

/**
 * Image URL builder
 * - ใช้สร้าง URL รูปแบบปรับขนาด/ครอป 1:1
 */
const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}

/**
 * สร้าง URL รูปสี่เหลี่ยมจัตุรัส 1:1
 * @param {any} image - Sanity image (asset/document or { _ref })
 * @param {number} size - ความกว้าง/สูง (px) ที่ต้องการ
 * @param {number} quality - คุณภาพรูป (default 75)
 * @returns {string} - URL ของรูปที่ปรับขนาดแล้ว
 */
export function square(image, size = 600, quality = 75) {
  return urlFor(image)
    .width(size)
    .height(size)
    .fit("crop")
    .auto("format")
    .quality(quality)
    .url();
}

/**
 * คืนค่า attrs ที่พร้อมผูกกับ <img> สำหรับการ์ดแบบ 1:1
 * - รองรับ DPR 1x/2x (เช่น 160/320, 336/672)
 * - ใส่ width/height เพื่อกัน CLS
 * - ปรับ q และ alt ได้
 *
 * @param {any} image - Sanity image
 * @param {{ size?: number, size2?: number, quality?: number, alt?: string }} opts
 * @returns {{ src: string, srcset: string, width: number, height: number, alt: string }}
 */
export function getSquareImageAttrs(image, opts = {}) {
  const {
    size = 160,          // mobile base (160)
    size2 = size * 2,    // dpr 2x (320) หรือ set 336/672 ตอน desktop
    quality = 75,
    alt = "",
  } = opts;

  const src1x = square(image, size, quality);
  const src2x = square(image, size2, quality);

  return {
    src: src1x,
    srcset: `${src1x} 1x, ${src2x} 2x`,
    width: size,
    height: size,
    alt,
  };
}

/**
 * ตัวช่วย preset สำหรับ mobile/desktop
 * - ใช้ในเพจลิสต์เพื่อความสั้น
 */
export const imgPresets = {
  mobile(image, alt = "", quality = 75) {
    // 160 / 320
    return getSquareImageAttrs(image, { size: 160, size2: 320, quality, alt });
  },
  desktop(image, alt = "", quality = 75) {
    // 336 / 672
    return getSquareImageAttrs(image, { size: 336, size2: 672, quality, alt });
  },
};

// Service Worker สำหรับ SabuyKapao
// ไฟล์นี้เป็น placeholder เพื่อป้องกัน 404 error

self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // ไม่ทำอะไรเป็นพิเศษ - ให้ browser จัดการเอง
  return;
});

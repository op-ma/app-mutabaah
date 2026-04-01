// UBAH ANGKA VERSI INI SETIAP KALI ADA UPDATE FITUR (Misal: v3, v4, v5)
const CACHE_NAME = 'mutabaah-cache-v4'; 

const urlsToCache = [
  './',
  './index.html', // CATATAN: Jika kamu belum me-rename file ke index.html di GitHub, ganti baris ini jadi './mutabaah2.html'
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // KUNCI 1: Memaksa Service Worker baru langsung aktif tanpa menunggu
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
             console.log('Menghapus cache versi lama:', cacheName);
             return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim(); // KUNCI 2: Langsung mengambil alih kontrol halaman di HP pengguna
});

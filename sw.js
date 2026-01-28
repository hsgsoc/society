// sw.js - Service Worker for SSRHS
const CACHE_NAME = 'ssrhs-v1';
const assets = [
  '/',
  '/index.html',
  '/assest/style.css',
  '/assest/image/society.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
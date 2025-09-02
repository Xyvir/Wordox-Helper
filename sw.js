const VERSION = '8';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store-v' + VERSION).then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/index.js',
      '/style.css',
      '/img/icon192.png',
      '/img/icon512.png',
      '/img/maskable.png',
      '/wordlist.js',
      '/js/Solver.js',
      '/js/Board.js',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

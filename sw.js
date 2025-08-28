// A name for our cache. It's good practice to include a version number.
const CACHE_NAME = 'wordox-helper-cache-v1';

// A list of all the files our app needs to function offline.
// For this app, it's just the main HTML file.
const FILES_TO_CACHE = [
  '/', // This represents the root path, which often serves index.html
  'index.html'
];

/**
 * The 'install' event.
 * This is fired when the service worker is first installed.
 * We use this event to open a cache and add our app's files to it.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

/**
 * The 'fetch' event.
 * This is fired every time the app tries to fetch a resource (like a page, image, etc.).
 * We intercept this request to serve the file from the cache if it's available.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Check the cache for a matching request.
    caches.match(event.request)
      .then((response) => {
        // If a cached version is found, return it.
        // If not, let the browser fetch it from the network as usual.
        // The "|| fetch(event.request)" is the fallback.
        return response || fetch(event.request);
      })
  );
});

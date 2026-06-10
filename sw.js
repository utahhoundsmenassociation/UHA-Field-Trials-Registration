// UHA Field Trials Sign-Up Form — Service Worker
// Version bump this string any time you deploy a new version of index.html
const CACHE_NAME = 'uha-signup-v5';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png'
];

// ── Install: cache the shell ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for app shell, network-first for Google Sheets ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always go network-only for the Apps Script endpoint
  if (url.hostname.includes('script.google.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Cache-first for everything else (the app shell)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

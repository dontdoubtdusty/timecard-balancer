// Offline support for Timecard Balancer.
// Punches are NOT stored here; they live in the browser's localStorage. This file only keeps
// a copy of the app itself so it opens without a connection.
// When you change any file below, bump VERSION so phones pick up the new copy.
const VERSION = 'v1';
const CACHE = 'timecard-balancer-' + VERSION;
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Install: save the app files
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

// Activate: delete saved copies from older versions
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('timecard-balancer-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: try the network first so updates show up, fall back to the saved copy offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Icons, manifest, Google Fonts and the pdf.js reader (its URL includes its version, so a saved copy never goes stale):
  // use the saved copy, fetch and save it the first time it is needed
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const isPdfJs = url.hostname === 'cdnjs.cloudflare.com' && url.pathname.startsWith('/ajax/libs/pdf.js/');
  if (sameOrigin || isFont || isPdfJs) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});

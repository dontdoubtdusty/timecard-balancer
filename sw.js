// Offline support for Timecard Balancer.
// Punches are NOT stored here; they live in the browser's localStorage. This file only keeps
// a copy of the app itself (page, icons, fonts, PDF reader) so it opens and works without a connection.
// When you change any file below, bump VERSION so phones pick up the new copy.
const VERSION = 'v3';
const CACHE = 'timecard-balancer-' + VERSION;
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './vendor/pdfjs/pdf.min.js',
  './vendor/pdfjs/pdf.worker.min.js',
  './fonts/barlow-400.woff2',
  './fonts/barlow-500.woff2',
  './fonts/barlow-600.woff2',
  './fonts/barlow-condensed-500.woff2',
  './fonts/barlow-condensed-600.woff2',
  './fonts/barlow-condensed-700.woff2',
  './fonts/ibm-plex-mono-400.woff2',
  './fonts/ibm-plex-mono-500.woff2',
  './fonts/ibm-plex-mono-600.woff2'
];

// Install: save every app file up front, so the first offline open already has everything
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
  if (url.origin !== self.location.origin) return;

  // The page itself: try the network first so updates show up, but give up after 3 seconds
  // (weak signal) and open the saved copy instead
  if (req.mode === 'navigate') {
    const net = fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; });
    const slow = new Promise((_, rej) => setTimeout(() => rej(new Error('slow')), 3000));
    e.respondWith(
      Promise.race([net, slow]).catch(() => caches.match('./index.html').then(hit => hit || net))
    );
    return;
  }

  // Everything else (icons, fonts, PDF reader): use the saved copy, fetch and save it if missing
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});

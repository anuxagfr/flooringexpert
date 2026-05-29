const CACHE_NAME = 'fe-offline-cache-v1';
const OFFLINE_URL = '/offline.html';

// 1. Service worker install hote hi offline page ko cache me save kar lega
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 2. Jab bhi koi page request fail hogi (offline hone par), ye offline.html show karega
self.addEventListener('fetch', (event) => {
    // Sirf page navigations (HTML fetch) ko intercept karein
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.open(CACHE_NAME).then((cache) => {
                    return cache.match(OFFLINE_URL);
                });
            })
        );
    }
});

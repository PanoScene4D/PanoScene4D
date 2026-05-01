// Cleanup-only service worker. The viewer unregisters service workers on load,
// but an older installed worker can still control one navigation first.
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
        await self.clients.claim();
    })());
});

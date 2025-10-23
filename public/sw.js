// public/sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// Fetch passthrough: NO cache, NO offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});

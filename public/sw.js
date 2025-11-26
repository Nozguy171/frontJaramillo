// public/sw.js

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// --- FIX IMPORTANTÍSIMO ---
// NO interceptar las rutas de upload de etiquetado manual
const MANUAL_BYPASS = [
  "/api/proxy/api/manual/",
  "/api/proxy/api/manual"
];

// Fetch passthrough
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Si la URL empieza con cualquiera de las rutas a ignorar ➜ no interceptar
  if (MANUAL_BYPASS.some((p) => url.pathname.startsWith(p))) {
    return; // dejar que el navegador la haga normal, sin SW
  }

  // cualquier otro request → passthrough normal
  event.respondWith(fetch(event.request));
});

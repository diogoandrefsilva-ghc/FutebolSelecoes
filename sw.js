/* Service worker — Mundiais das Seleções (cache-first com atualização em rede) */
const CACHE = "mundiais-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./live2026.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./data/2026.json",
  "./data/2022.json",
  "./data/2018.json",
  "./data/2014.json",
  "./data/2010.json",
  "./data/2006.json",
  "./data/2002.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });

// Só faz cache de pedidos do próprio domínio (GET). APIs externas (ex.: ESPN) passam direto à rede.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

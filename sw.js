/* Service worker — Seleções: Mundiais & Euros (cache-first com atualização em rede) */
const CACHE = "selecoes-v18";
const ASSETS = [
  "./",
  "./index.html",
  "./live2026.js?v=18",
  "./manifest.webmanifest",
  "./icon.svg",
  "./data/2026.json",
  "./data/2022.json",
  "./data/2018.json",
  "./data/2014.json",
  "./data/2010.json",
  "./data/2006.json",
  "./data/2002.json",
  "./data/euro2024.json",
  "./data/euro2020.json",
  "./data/euro2016.json",
  "./data/euro2012.json",
  "./data/euro2008.json",
  "./data/euro2004.json",
  "./data/euro2000.json"
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
  if (url.origin !== self.location.origin) return;   // odds (AppDataJSON / raw.githubusercontent / api.github) são cross-origin → passam direto
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

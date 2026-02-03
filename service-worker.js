const CACHE_NAME = "snake-pwa-cache";
const FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/game.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/index.html")
    
    )
  );
});

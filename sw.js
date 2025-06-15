const CACHE_NAME = "delish-food-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style/style.css",
  "/images/icon-192.png",
  "/images/icon-512.png",
  // aur agar aur files hain, unka path bhi yahan daalo
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log("✅ Service Worker Installed");
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// Install service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = caches.open(CACHE_NAME);
      console.log("cache opened");
      cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting())
  );
});

// Activate service worker
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const res = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.add(res);
        });
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

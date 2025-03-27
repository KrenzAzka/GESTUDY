const CACHE_NAME = "gestudy-cache-v1.2"; // Increment version to force cache update
const BASE_URL = "/GESTUDY/"; // Make sure this matches your GitHub repo name

const assetsToCache = [
    `${BASE_URL}`,
    `${BASE_URL}index.html`,
    `${BASE_URL}styles.css`,
    `${BASE_URL}script.js`,
    `${BASE_URL}icons/icon-192x192.png`,
    `${BASE_URL}icons/icon-512x512.png`,
    `${BASE_URL}video-ipa-1.html`,
    `${BASE_URL}video-ipa-2.html`,
    `${BASE_URL}quiz-ipa-1.html`,
    `${BASE_URL}quiz-ipa-2.html`,
    `${BASE_URL}video-list-ipa.html`,
    `${BASE_URL}video-list-ips.html`,
    `${BASE_URL}main.html`,
    `${BASE_URL}landing.html`,
    `${BASE_URL}GESTUDY-circle.png`,
    `${BASE_URL}GESTUDY-logo.png`,
    `${BASE_URL}GESTUDY-wave.png`,
    `${BASE_URL}logo-ipa.png`,
    `${BASE_URL}logo-ips.png`
];

// ✅ Install Event - Caches Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching new assets...");
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting(); // Activate new SW immediately
});

// ✅ Activate Event - Deletes Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Claim active clients immediately
});

// ✅ Fetch Event - Serve From Cache, Update Cache with Network Response
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

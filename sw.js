const CACHE_NAME = "gestudy-cache-v1";
const BASE_URL = "/GESTUDY/"; // <-- Add your GitHub repo name here

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
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
      ]);
    })
  );
});

  
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes(BASE_URL)) { // Ensure only requests within your repo are cached
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
});
  
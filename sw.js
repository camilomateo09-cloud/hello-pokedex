const CACHE_NAME = "pokedex-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./pokemon.html",
  "./style.css",
  "./app.js",
  "./pokemon.js",
  "./manifest.json",
  "./img/pokemonicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
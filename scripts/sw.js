const STATIC_CACHE = "static";

const APP_SHELL =
[
    "/",
    "../html/cv.html",
    "../styles/css/bootstrap.cs",
    "two.js",
];

self.addEventListener("install", (e) => {
    const cacheStatic = caches.open(STATIC_CACHE).then( cache => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});
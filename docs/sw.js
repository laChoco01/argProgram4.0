
const STATIC_CACHE = "static";

const APP_SHELL =
[
    "/",
    "./index.html",
    "./styles/css/bootstrap.css",
    "./scripts/two.js",
];
//first install sw
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
        .then(function (cache) {
            console.log('cache its open!');
            return cache.addAll(APP_SHELL);
        })
    )
})
//second generating sw query
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});
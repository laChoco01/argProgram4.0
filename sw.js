
const STATIC_CACHE = "static";

const APP_SHELL =
[
    "/",
    "./html/cv.html",
    "./styles/css/bootstrap.css",
    "./scripts/two.js",
];

/* first version of sw
self.addEventListener("install", (e) => {
    const cacheStatic = caches.open(STATIC_CACHE).then( cache => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});
*/
// version of googleDevs
/*
Copyright 2015, 2019, 2020, 2021 Google LLC. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.


// Al incrementar el  OFFLINE_VERSION obligará a lanzar el evento de instalación y
// los caché anteriores serán actualizados desde la red.
// Esta variable está declarada intencionalmente y no se usa.
// Agrega un comentario para tu linter si lo deseas:
// eslint-disable-next-line no-unused-vars
const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
// Modifica esto con una diferente URL si es necesario.
const OFFLINE_URL = "/html/cv.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Al definir {cache: 'reload'} en la nueva consulta asegurara que la
      // respuesta no sea desde el caché de HTTP; i.e., esta será
      // de la red.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );
  // Obliga al service worker que espera a que se convierta en uno activo.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Permite la navegación precargada si tiene compatibilidad
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Le dice al service worker activo que tome el control inmediato de la página.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Solo queremos llamar al event.respondWith() si es una solicitud de navegación
  // para una página HTML.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Primero, utiliza una respuesta de precarga de navegación.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Siempre usa la red primero.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // El catch solo se dispara cuando se obtiene una excepción
          // gracias a un error en la red.
          // Si fetch() regresa una respuesta HTTP valida con un codigo de respuesta en el
          // rango de 4xx o 5xx, el catch() no se llamará
          console.log("Fetch failed; returning offline page instead.", error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }

  // si nuestra condición de if() es falso, el controlador de fetch no atrapará la
  // solicitud. Si hay más controladores de fetch registrados, ellos tendrán la
  // oportunidad de llamar a event.respondWith(). De lo contrario, si no hay, no se llamará a
  // event.respondWith(), la solicitud será controlada por el buscador como si no
  // los service worker no se hubieran involucrado.
});
*/
//one more
//first install cache
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
        .then(function (cache) {
            console.log('cache openeado vieja');
            return cache.addAll(APP_SHELL);
        })
    )
})
//second generate questions for proxy
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
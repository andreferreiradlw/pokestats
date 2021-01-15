if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
  )
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded')
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

    workbox.core.clientsClaim()
    // transit the status from waiting to activate
    workbox.core.skipWaiting()

    workbox.precaching.cleanupOutdatedCaches()

    /* custom cache rules */

    //For images
    workbox.routing.registerRoute(
      new RegExp('.(?:png|gif|jpg|jpeg|webp|svg)$'),
      new workbox.strategies.CacheFirst({
        cacheName: 'image-caches',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 12 * 60 * 60,
          }),
        ],
      }),
      'GET'
    )

    //For JS/CSS
    /*
    Resources are requested from both the cache and the network in parallel. 
    The strategy will respond with the cached version if available, otherwise wait for the network response. 
    The cache is updated with the network response with each successful request
    */
    workbox.routing.registerRoute(
      new RegExp('.(?:js|css)$'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-css-caches',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 12 * 60 * 60,
          }),
        ],
      })
    )

    //For HTML
    workbox.routing.registerRoute(
      new RegExp('/'),
      new workbox.strategies.NetworkFirst({
        cacheName: 'html-caches',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 12 * 60 * 60,
          }),
        ],
      }),
      'GET'
    )

    //Other resources
    workbox.routing.registerRoute(
      new RegExp('/_next/static/'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-caches',
      })
    )
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}

const imgRe = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[\/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/
const version = 1

self.addEventListener('fetch', function (event) {
  if (event.request.url.match(imgRe)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response
        }

        return fetch(event.request)
          .then(function (response) {
            if (event.request.url.match(imgRe)) {
              caches
                .open('pokeapi-js-wrapper-images-' + version)
                .then(function (cache) {
                  // The response is opaque, if it fails cache.add() will reject it
                  cache.add(event.request.url)
                })
            }
            return response
          })
          .catch(function (error) {
            console.error(error)
          })
      })
    )
  }
})

self.addEventListener('install', function (event) {
  self.skipWaiting()
})

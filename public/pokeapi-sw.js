/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js'
)

self.skipWaiting()

workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// css, js
workbox.routing.registerRoute(
  /.*\.(?:js|css)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-css-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
  'GET'
)
// homepage
workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'homepage-cache',
    plugins: [],
  }),
  'GET'
)
// pokemon page
workbox.routing.registerRoute(
  '/pokemon/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pokemon-cache',
    plugins: [],
  }),
  'GET'
)
// pokeapi requests
workbox.routing.registerRoute(
  /^https:\/\/pokeapi.co\/api\/v2/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 604800,
        purgeOnQuotaError: false,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
  'GET'
)
// google fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts.googleapis.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    plugins: [],
  }),
  'GET'
)

// POKE API IMAGE REQUESTS
const imgRe = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[\/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/

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
              caches.open('images-cache').then(function (cache) {
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

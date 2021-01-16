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
  '/static/workbox/workbox-v4.3.1/workbox-sw.js',
  '/static/workbox/next-precache-manifest-e2b7d73e4bd4503af08535ec35edf558.js'
)

workbox.core.skipWaiting()

workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
  /.*\.(?:js|css)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-css-cache',
    plugins: [new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })],
  }),
  'GET'
)
workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'homepage-cache',
    plugins: [],
  }),
  'GET'
)
workbox.routing.registerRoute(
  '/pokemon/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pokemon-cache',
    plugins: [],
  }),
  'GET'
)
workbox.routing.registerRoute(
  /^https:\/\/pokeapi.co\/api\/v2/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 604800,
        purgeOnQuotaError: false,
      }),
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
    ],
  }),
  'GET'
)
workbox.routing.registerRoute(
  /^https:\/\/fonts.googleapis.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    plugins: [],
  }),
  'GET'
)

// POKE API REQUESTS
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
              caches.open('images-cache-' + version).then(function (cache) {
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

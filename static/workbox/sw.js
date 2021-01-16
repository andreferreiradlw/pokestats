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
  "/static/workbox/workbox-v4.3.1/workbox-sw.js",
  "/static/workbox/next-precache-manifest-ef92e53c99149c2d9689a76c82c708ef.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/raw.githubusercontent.com\/PokeAPI\/sprites/, new workbox.strategies.CacheFirst({ "cacheName":"image-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 500, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/.*\.(?:js|css)/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"js-css-caches", plugins: [] }), 'GET');
workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/pokeapi.co\/api\/v2/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"api-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 500, maxAgeSeconds: 300, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts.googleapis.com/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"google-fonts", plugins: [] }), 'GET');

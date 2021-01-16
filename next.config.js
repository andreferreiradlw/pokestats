const withImages = require('next-images')
const nextWorkboxWebpackPlugin = require('next-workbox-webpack-plugin')
const path = require('path')

module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, { isServer, buildId, dev }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next',
      },
      runtimeCaching: [
        /** 
        {
          urlPattern: new RegExp(
            '^https://raw.githubusercontent.com/PokeAPI/sprites'
          ),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        */
        {
          urlPattern: /.*\.(?:js|css)/,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'js-css-caches',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: new RegExp('^https://pokeapi.co/api/v2'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 5 * 60,
            },
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        {
          urlPattern: new RegExp('^https://fonts.googleapis.com'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'google-fonts',
          },
        },
      ],
    }

    if (!isServer && !dev) {
      config.plugins.push(
        new nextWorkboxWebpackPlugin({
          buildId,
          ...workboxOptions,
        })
      )
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})

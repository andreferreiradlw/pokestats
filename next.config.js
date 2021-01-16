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
        {
          urlPattern: /.*\.(?:js|css)/,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'js-css-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'homepage-cache',
          },
        },
        {
          urlPattern: '/pokemon/',
          handler: 'networkFirst',
          options: {
            cacheName: 'pokemon-cache',
          },
        },
        {
          urlPattern: new RegExp('^https://pokeapi.co/api/v2'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
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
            cacheName: 'google-fonts-cache',
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

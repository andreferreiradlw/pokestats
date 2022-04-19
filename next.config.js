const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  target: 'serverless',
  images: {
    disableStaticImages: true,
  },
  env: {
    NEXT_PUBLIC_ENV_VAR: process.env.NEXT_PUBLIC_ENV_VAR,
    NEXT_PUBLIC_GA: process.env.NEXT_PUBLIC_GA,
  },
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})

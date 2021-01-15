const withImages = require('next-images')
const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA(
  withImages({
    pwa: {
      dest: 'public',
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
)

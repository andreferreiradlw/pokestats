const withImages = require('next-images')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})

/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS,
  },
  staticPageGenerationTimeout: 1000,
  experimental: {
    largePageDataBytes: 300 * 100000,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  staticPageGenerationTimeout: 90,
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

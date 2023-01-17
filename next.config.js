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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/andreferreiradlw/pokestats_media/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

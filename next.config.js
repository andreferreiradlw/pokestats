/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true, // Ensure SWC minification is enabled
  compiler: {
    emotion: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS,
    NEXT_PUBLIC_ENV_VAR: process.env.NEXT_PUBLIC_ENV_VAR,
  },
  staticPageGenerationTimeout: 120,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/master/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/andreferreiradlw/pokestats_media/main/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/msikma/pokesprite/master/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/script.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

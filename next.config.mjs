import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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

  // Add rewrites to bypass ad blockers
  async rewrites() {
    return [
      {
        source: '/homer.js', // Your custom endpoint
        destination: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL, // The real Umami script URL
      },
      {
        source: '/api/umami', // Rewrite API endpoint for event tracking
        destination: `${process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL.replace('umami.js', 'api/event')}`,
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

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform(); // This enables Cloudflare bindings in development mode
}

export default nextConfig;

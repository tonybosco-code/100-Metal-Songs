// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Whitelist remote image hosts for <Image />
  images: {
    // Either "domains" or "remotePatterns" works; using both is fine.
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Keep these if you were already using them for CI builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
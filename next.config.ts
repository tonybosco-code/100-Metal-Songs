import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Allow production builds to complete even if there are TS errors
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
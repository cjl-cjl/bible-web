import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  allowedDevOrigins: ['192.168.18.6'],
  experimental: {
    isolatedDevBuild: true,
  },
};

export default nextConfig;

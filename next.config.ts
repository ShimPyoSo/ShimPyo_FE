import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `shimpyo.s3.amazonaws.com`,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

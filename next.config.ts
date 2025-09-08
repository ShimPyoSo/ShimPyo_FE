import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `shimpyo.s3.amazonaws.com`,
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: `tong.visitkorea.or.kr`,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tong.visitkorea.or.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

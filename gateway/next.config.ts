import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/student', destination: 'http://localhost:3002' },
      { source: '/student/:path*', destination: 'http://localhost:3002/:path*' },
      { source: '/teacher', destination: 'http://localhost:3001' },
      { source: '/teacher/:path*', destination: 'http://localhost:3001/:path*' },
      { source: '/onboarding', destination: 'http://localhost:3003' },
      { source: '/onboarding/:path*', destination: 'http://localhost:3003/:path*' },
    ];
  },
};

export default nextConfig;

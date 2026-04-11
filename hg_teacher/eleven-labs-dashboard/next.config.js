/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/teacher',
  assetPrefix: '/teacher',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/student',
  assetPrefix: '/student',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madni/db', '@madni/types'],
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

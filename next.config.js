/** @type {import('next').NextConfig} */
const nextConfig = {
  serverPort: process.env.PORT || 3000,
  experimental: {
    serverComponentsExternalPackages: ['postgres', 'bcryptjs'],
  },
}

module.exports = nextConfig
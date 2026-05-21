/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['postgres', 'bcryptjs'],
  experimental: {
    outputFileTracingExcludes: {
      '**/test/**': ['**/*'],
    },
  },
}

module.exports = nextConfig
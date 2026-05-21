/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['postgres', 'bcryptjs'],
  outputFileTracingExcludes: {
    '**/test/**': ['**/*'],
  },
}

module.exports = nextConfig
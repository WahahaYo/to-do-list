/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['postgres', 'bcryptjs'],
  outputFileTracingExcludes: {
    '**/test/**': ['**/*'],
  },
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
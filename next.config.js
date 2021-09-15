/** @type {import('next').NextConfig} */
module.exports = {
  target: 'serverless',
  async rewrites() {
    return [
      {
        source: '/dashboard/settings',
        destination: '/dashboard/settings/',
      },
      // Rewrite eveything to pages/index
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com']
  },
  publicRuntimeConfig: {
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_REGION: process.env.COGNITO_REGION,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/dashboard': { page: '/dashboard' },
    }
  },
}

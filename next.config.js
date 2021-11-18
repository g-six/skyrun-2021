/** @type {import('next').NextConfig} */

const languages = ['en', 'zh']
const translated_pages = {}
const pages = [
  '',
  'about-us',
  'coming-soon',
  'dashboard',
  'dashboard/calendar',
  'dashboard/clients',
  'dashboard/locations',
  'dashboard/packages',
  'dashboard/products',
  'dashboard/reports',
  'dashboard/resources',
  'dashboard/services',
  'dashboard/settings',
]
pages.forEach((page) => {
  languages.forEach((language) => {
    translated_pages[`/${language}/${page}`] = {
      page: `/${page || process.env.LANDING_PAGE || ''}`,
    }
  })
})

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com']
  },
  publicRuntimeConfig: process.env,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    console.log('Landing page for environment:', process.env.LANDING_PAGE)
    console.log({
      '/': { page: '/' },
      ...translated_pages,
    })
    console.log('BITBUCKET_BRANCH:', BITBUCKET_BRANCH)
    console.log('NODE_ENV:', NODE_ENV)
    console.log('GA_MEASUREMENT_ID_PROD:', GA_MEASUREMENT_ID_PROD)
    console.log('GA_MEASUREMENT_ID_PROD:', GA_MEASUREMENT_ID_PROD)
    console.log('FACEBOOK_PIXEL_ID:', FACEBOOK_PIXEL_ID)
    return {
      '/': { page: process.env.LANDING_PAGE || '/' },
      ...translated_pages,
    }
  },
}

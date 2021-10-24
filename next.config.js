/** @type {import('next').NextConfig} */

const other_languages = ['zh']
const translated_pages = {}
const pages = [
  '',
  'about-us',
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
  other_languages.forEach((language) => {
    translated_pages[`/${page}`] = {
      page: `/${page}`,
    }
    translated_pages[`/${language}/${page}`] = {
      page: `/${page}`,
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
    console.log({
      '/': { page: '/' },
      ...translated_pages,
    })
    return {
      '/': { page: '/' },
      ...translated_pages,
    }
  },
}

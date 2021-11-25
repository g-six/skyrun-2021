import getConfig from 'next/config'

export const { FACEBOOK_PIXEL_ID } = getConfig().publicRuntimeConfig

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options)
}

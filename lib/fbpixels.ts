import getConfig from 'next/config'

const { FACEBOOK_PIXEL_ID } = getConfig().publicRuntimeConfig

export const FB_PIXEL_ID = FACEBOOK_PIXEL_ID

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options)
}

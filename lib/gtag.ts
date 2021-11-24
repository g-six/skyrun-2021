import getConfig from 'next/config'

const { BITBUCKET_BRANCH, GA_MEASUREMENT_ID_PROD, GA_MEASUREMENT_ID_NON_PROD } = getConfig().publicRuntimeConfig

export const GA_TRACKING_ID = BITBUCKET_BRANCH != "prod" ? GA_MEASUREMENT_ID_NON_PROD : GA_MEASUREMENT_ID_PROD

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag("config", GA_TRACKING_ID)
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}

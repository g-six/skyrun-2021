import getConfig from 'next/config'

const { NODE_ENV } = getConfig().publicRuntimeConfig

export function isProdEnv() {
  return NODE_ENV === "production" ? true : false
}

import getConfig from 'next/config'

const { BITBUCKET_BRANCH  } = getConfig().publicRuntimeConfig

export function isProdEnv() {
  return BITBUCKET_BRANCH == "prod" ? true : false
}

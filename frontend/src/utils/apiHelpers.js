// import urljoin from 'url-join'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

// export const getURLForEndpoint = endpoint => urljoin(API_URI, endpoint)
export const getURLForEndpoint = endpoint => `${publicRuntimeConfig.API_URL}${endpoint}`

import urljoin from 'url-join'

const API_URI = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : '/'

console.log(process.env.REACT_APP_API_URI)

export const getURLForEndpoint = endpoint => urljoin(API_URI, endpoint)

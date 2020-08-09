// import urljoin from 'url-join'

const API_URI = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : '/'

// export const getURLForEndpoint = endpoint => urljoin(API_URI, endpoint)
export const getURLForEndpoint = endpoint => `http://localhost:8080/${endpoint}`

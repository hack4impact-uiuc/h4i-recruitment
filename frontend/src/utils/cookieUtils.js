// from PI's auth examples here: https://github.com/hack4impact-uiuc/infra-authentication-examples/blob/master/nextjs-client-example/utils/cookie.js
import cookie from 'js-cookie'

const getCookieFromBrowser = key => {
  return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split('=')[1]
}

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/',
    })
  }
}

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const getCookie = (key, req) => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

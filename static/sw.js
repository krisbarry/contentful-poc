importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1fce92e598a49509ab24.js",
    "revision": "b4c27553996ac06fb0bcc516b1edf259"
  },
  {
    "url": "/_nuxt/24ffca160bb9c6ea65fe.js",
    "revision": "64caf9fbc2b26102d860b25423dd2da0"
  },
  {
    "url": "/_nuxt/2833780f4b99aa266b6b.js",
    "revision": "264b9c0efc937f33586579e6f30269d2"
  },
  {
    "url": "/_nuxt/3eaf353f795a54e121ee.js",
    "revision": "6de3c2c58d85502370694ee8e62c1011"
  },
  {
    "url": "/_nuxt/84608242e570133a67d4.js",
    "revision": "9dc4d66227ac78aa7b0b8dcb3d80da2c"
  },
  {
    "url": "/_nuxt/9ec9b2e57323828d8435.js",
    "revision": "c4a1170d9e958dd5305e786db30338ab"
  },
  {
    "url": "/_nuxt/eae7da6533c96159e590.js",
    "revision": "c05bab81781fade42b1f13eeef39ef86"
  }
], {
  "cacheId": "sample-nuxt-app",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    return config
  },
  publicRuntimeConfig: {
    BACKEND_PORT: process.env.BACKEND_PORT === undefined ? 8080 : process.env.BACKEND_PORT
  }
}

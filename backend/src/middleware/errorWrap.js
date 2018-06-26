/*
 * Middleware to allow us to safely handle erros in async/await code
 * without wrapping each route in try...catch blocks
 */
const errorWrap = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
module.exports = errorWrap

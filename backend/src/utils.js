const { Stats } = require('./models')
/*
 * Middleware to allow us to safely handle erros in async/await code
 * without wrapping each route in try...catch blocks
 */
const errorWrap = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

const getStats = async () => {
  const res = await Stats.find()
  if (res.length !== 0) {
    return res
  }
  // none exist
  const newStats = await new Stats()
  newStats.save()
  return newStats
}
module.exports = {
  errorWrap,
  getStats
}

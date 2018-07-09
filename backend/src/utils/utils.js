const { Stats } = require('../models')

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
  getStats
}

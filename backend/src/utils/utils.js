const { Stats } = require('../models')
const moment = require('moment')

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

const attendeeIsLate = event => {
  const curMoment = moment()
  const startMoment = moment(`${event.date} ${event.startTime}`)

  if (curMoment.isAfter(startMoment)) {
    return true
  }
  return false
}

module.exports = {
  getStats,
  attendeeIsLate
}

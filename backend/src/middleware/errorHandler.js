const errorHandler = (err, req, res, _next) => {
  console.error(err)
  res.status(500).json({ status: 'Failed', message: err })
}

module.exports = errorHandler

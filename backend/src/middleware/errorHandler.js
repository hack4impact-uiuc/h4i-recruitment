const errorHandler = (err, req, res, _next) => {
  console.error(err)
  console.error(err.stack)
  res.status(500).json({ status: 'Failed', message: err.message })
}

module.exports = errorHandler

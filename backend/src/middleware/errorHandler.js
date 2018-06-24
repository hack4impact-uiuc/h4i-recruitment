const errorHandler = (err, req, res, _next) => {
  res.status(500).json({ message: err })
}

module.exports = errorHandler

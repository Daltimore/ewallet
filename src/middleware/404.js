const createError = require('http-errors');

module.exports = function (_, res) {
  const err = new createError.NotFound();

  res.status(err.status || 500).json({
    'status': err.status,
    'message': err.message
  });
}
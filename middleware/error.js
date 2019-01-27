const createError = require('http-errors');

module.exports = function (err, _, res) {
  const error = new createError.InternalServerError();

  res.status(err.status || error.status || 500).json({
    'status': err.status || error.status,
    'message': err.message || error.message
  });
}
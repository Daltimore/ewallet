const createError = require('http-errors');

module.exports = function (err, _, res, next) {
  const error = new createError.InternalServerError();

  return res.status(error.status || 500).json({
    'status': err.status || false,
    'message': err.message || error.message
  });
}
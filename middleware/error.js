module.exports = function (err, _, res) {
  res.status(err.status || 500).json({
    'status': err.status,
    'message': err.message
  });
}
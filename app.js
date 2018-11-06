var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

/**
 * Catch and handle 404 Error
 */
app.use(function (req, res) {
  const err = new createError.NotFound();

  res.status(err.status || 500).json({
    'success': false,
    'status': err.status,
    'message': err.message
  });
});

module.exports = app;

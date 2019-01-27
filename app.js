const express = require('express');
// require('express-async-errors')
const reqLogger = require('morgan');
const app = express();

app.use(reqLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

startup('db').Connect()

// Route handlers
app.use('/users', route('users'));

// Catch and handle Server/Promise related Errors
app.use(middleware('error'));

// Catch and handle 404 Errors
app.use(middleware('404'));

module.exports = app;

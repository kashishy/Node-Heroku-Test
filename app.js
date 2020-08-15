var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
//var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');

var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pollsRouter = require('./routes/polls');

//const url = config.mongoUrl;
const connect = mongoose.connect(process.env.DB_URL,  { useUnifiedTopology: true, useNewUrlParser: true});
connect.then((db) => {
  console.log('Connected correctly to server');
},(err) => { console.log(err)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/polls', pollsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

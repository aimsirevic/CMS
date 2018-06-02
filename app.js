var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var hbs = require('handlebars');
var expressValidator = require('express-validator');
var passport = require('passport');
var flash = require('express-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/remotio_cms');

var admin = require('./routes/admin');

var app = express();

console.log(path.join(__dirname, 'uploads'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHandlebars({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

hbs.registerHelper('ifCond', require('./views/helpers/ifCond').ifCond);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'FileManager')));

var session = require("express-session")({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
});

app.use(session);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.validation_errors = req.flash('validation_errors');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', admin);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
app.use(function (err, req, res, next) {
  res.locals.success_msg = err.message;
  res.locals.error_msg = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./routes/config')
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var redirectRouter = require('./routes/redirect');
var cscanbRouter = require('./routes/cscanb');
var bscancRouter = require('./routes/bscanc');
var wap_payRouter = require('./routes/wap_pay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/redirect', redirectRouter);
app.use('/cscanb', cscanbRouter);
app.use('/bscanc', bscancRouter);
app.use('/wap_pay', wap_payRouter);

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

const port = config.port;
app.listen(port,() => console.log(`Server started on ${port}`))

module.exports = app;

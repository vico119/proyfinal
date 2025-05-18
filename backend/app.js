var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoutes');
//const authRoutes = require('./routes/authRoutes');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/api/auth', authRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

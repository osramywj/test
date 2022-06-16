"use strict";

var _require = require('chalk'),
    reset = _require.reset;

var express = require('express');

var app = express();
app.use(function (req, res, next) {
  console.log('middleware');
  next();
});
app.get('/students', function (req, res) {
  console.log(req.url);
  res.send('我是学生列表');
});
app.listen(8081);
"use strict";

var Koa = require('koa');

var Router = require('koa-router');

var _require = require('./dubbo'),
    dubbo = _require.dubbo;

var app = new Koa();
var router = new Router();
router.get('/', function _callee(ctx) {
  var params, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = {
            "typeConfig": [{
              "dataType": "workOrder",
              "dataTypeName": "作战地图",
              "dataTypeEnName": "logGroup",
              "isMaintenance": 1,
              "isRead": 1,
              "modelType": 1
            }]
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(dubbo.service.demoProvider.initMultiTypeData(params));

        case 3:
          res = _context.sent;
          ctx.body = 'success';

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // use route

app.use(router.routes()).use(router.allowedMethods()); // listen server

app.listen(3000);
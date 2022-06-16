"use strict";

var http = require('http');

var ConsulConfig = require('./consul');

var consul = new ConsulConfig();
http.createServer(function _callee(req, res) {
  var url, method, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = req.url, method = req.method; // 测试健康检查

          if (url === '/health') {
            res.end('OK!');
          } // 测试动态读取数据


          if (!(method === 'GET' && url === '/user/info')) {
            _context.next = 7;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(consul.getUserConfig());

        case 5:
          user = _context.sent;
          res.end("\u4F60\u597D\uFF0C\u6211\u662F ".concat(user.name, " \u4ECA\u5E74 ").concat(user.age));

        case 7:
          if (!(method === 'POST' && url === '/user')) {
            _context.next = 18;
            break;
          }

          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(consul.setUserConfig('age', 18));

        case 11:
          // 将 age 更改为 18
          res.end('OK!');
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          console.error(_context.t0);
          res.end('ERROR!');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 14]]);
}).listen('8081');
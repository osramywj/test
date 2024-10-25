/*
 * @Author: june.yang 1027612662@qq.com
 * @Date: 2023-07-24 10:22:43
 * @LastEditors: june.yang 1027612662@qq.com
 * @LastEditTime: 2023-07-28 19:29:22
 * @FilePath: /test/tokenServer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Koa = require('koa');
const app = new Koa();
let tokenMap = {};

// 模拟获取Token的接口，返回一个随机生成的Token
app.use(async (ctx, next) => {
  if (ctx.path === '/get-token-body') {
    const token = generateRandomToken();
    ctx.body = { token };
    return;
  }

  if (ctx.path === '/get-token-header') {
    const token = generateRandomToken();
    ctx.set("token", token);
    ctx.body = "success";
    return;
  }
  await next();
});

// 模拟验证Token的中间件
const verifyToken = async (ctx, next) => {
  const token = ctx.request.headers['token'];

  // 假设验证token的逻辑是检查token是否存在且有效
  if (isValidToken(token)) {
    await next();
  } else {
    // ctx.status = 401;
    ctx.status = 200;
    ctx.body = 'token失效';

  }
};

app.use(async (ctx, next) => {
  if (ctx.path === '/simple') {
    ctx.body = {
      code: 0,
      msg: "获取成功",
      data: "这个接口不需要token"
    };
  } else {
    await next();
  }
})

// Demo接口，需要在header中带上token参数
app.use(verifyToken);
app.use(async (ctx) => {
  if (ctx.path === '/demo') {
    ctx.body = {
      code: 0,
      msg: "获取成功",
      data: [
        { id: 1, name: "Jack" },
        { id: 2, name: "LiLi" },
        { id: 3, name: "Jordan" },
      ]
    };
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// 生成随机的Token
function generateRandomToken() {
  const now = Date.now();
  const tokenExpire = now + 5 * 60 * 1000;
  tokenMap[now] = tokenExpire;
  return now;
}

// 假设验证Token的逻辑
function isValidToken(token) {
  // 在实际应用中，可以根据业务逻辑自定义token的验证
  const expireTime = tokenMap[token];
  if (Date.now() <= expireTime) {
    return true;
  } else {
    delete tokenMap[token];
    return false;
  }
}

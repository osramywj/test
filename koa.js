const Koa = require('koa');
const Router = require('koa-router');
const { dubbo } = require('./dubbo');


const app = new Koa()
const router = new Router()

router.get('/', async (ctx) => {
  const params = {
    "typeConfig": [
      {
        "dataType": "workOrder",
        "dataTypeName": "作战地图",
        "dataTypeEnName": "logGroup",
        "isMaintenance": 1,
        "isRead": 1,
        "modelType": 1
      },
    ]
  }

  const res = await dubbo.service.demoProvider.initMultiTypeData(params)
  ctx.body = 'success';
})

// use route
app.use(router.routes()).use(router.allowedMethods())

// listen server
app.listen(3000)
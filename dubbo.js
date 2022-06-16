// create the service to be injected
const { Dubbo, java, dubboSetting } = require('apache-dubbo-consumer');
const { Nacos } = require('apache-dubbo-registry');


const setting = dubboSetting
  .match(
    [
      'com.cloudwise.douc.facade.DataDubboFacade',
    ],
    {
      group: 'DOUC_RPC_DUBBO',
      version: '1.0.0'
    }
  )


const demoProvider = (dubbo) =>
  dubbo.proxyService({
    dubboInterface: 'com.cloudwise.douc.facade.DataDubboFacade',
    version: '1.0.0',
    group: 'DOUC_RPC_DUBBO',
    methods: {
      initMultiTypeData(params) {
        return [java.combine('com.cloudwise.douc.dto.DubboOtheDataTypeReq', params)]
      },
    }
  })

// integrate the service in demoProvider with dubbo object constructor
const services = {
  demoProvider
}

const dubbo = new Dubbo({
  application: {
    name: 'douc-rpc-dubbo'
  },
  services,
  dubboSetting: setting,
  registry: Nacos({
    connect: '10.0.16.176:18117',
    logger: console,
    namespace: 'PROD',
    username: 'nacos',
    password: 'Nacos_654321'
  })
})

module.exports = { dubbo };
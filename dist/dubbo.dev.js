"use strict";

// create the service to be injected
var _require = require('apache-dubbo-consumer'),
    Dubbo = _require.Dubbo,
    java = _require.java,
    dubboSetting = _require.dubboSetting;

var _require2 = require('apache-dubbo-registry'),
    Nacos = _require2.Nacos;

var setting = dubboSetting.match(['com.cloudwise.douc.facade.DataDubboFacade'], {
  group: 'DOUC_RPC_DUBBO',
  version: '1.0.0'
});

var demoProvider = function demoProvider(dubbo) {
  return dubbo.proxyService({
    dubboInterface: 'com.cloudwise.douc.facade.DataDubboFacade',
    version: '1.0.0',
    group: 'DOUC_RPC_DUBBO',
    methods: {
      initMultiTypeData: function initMultiTypeData(params) {
        return [java.combine('com.cloudwise.douc.dto.DubboOtheDataTypeReq', params)];
      }
    }
  });
}; // integrate the service in demoProvider with dubbo object constructor


var services = {
  demoProvider: demoProvider
};
var dubbo = new Dubbo({
  application: {
    name: 'douc-rpc-dubbo'
  },
  services: services,
  dubboSetting: setting,
  registry: Nacos({
    connect: '10.0.16.176:18117',
    logger: console,
    namespace: 'PROD',
    username: 'nacos',
    password: 'Nacos_654321'
  })
});
module.exports = {
  dubbo: dubbo
};
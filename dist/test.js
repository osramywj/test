"use strict";
// // 先进行一些装饰器的定义
// function logClass1(target: any) {
//    console.log('logClass1')
//  }
//  ​
//  function logClass2(target: any) {
//    console.log('logClass2')
//  }
//  ​
//  function logAttribute1(param?: any) {
//    console.log('0000000000');
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//    return function (target: any, attrName: string) {
//      console.log('attribute1')
//    }
//  }
//  ​
//  function logAttribute2(param?: any) {
//   console.log('11111111111');
//    return function (target: any, attrName: string) {
//      console.log('attribute2')
//    }
//  }
//  ​
//  function logMethod1(param?: any) {
//   console.log(33333333);
//    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
//      console.log('logMethod1')
//    }
//  }
//  ​
//  function logMethod2(param?: any) {
//   console.log(44444444);
//    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
//      console.log('logMethod2')
//    }
//  }
//  ​
//  function logParam1(param?: any) {
//    return function (target: any, methodName: string, index: number) {
//      console.log('logParam1')
//    }
//  }
//  ​
//  function logParam2(param?: any) {
//    return function (target: any, methodName: string, index: number) {
//      console.log('logParam2')
//    }
//  }
//  ​
//  @logClass1
//  @logClass2
//  class HttpClient {
//    @logAttribute1()
//    api1: string | undefined
//    @logAttribute2()
//    api2: string | undefined
//  ​
//    constructor() {
//    }
//  ​
//    @logMethod1()
//    get1() {
//    }
//  ​
//    @logMethod2()
//    get2() { }
//  ​
//    get3(@logParam1() param1: string, @logParam2() param2: string) { }
//  }
function get(params) {
    console.log(params); // http://www.baidu.com
    return function (target, methodName, descriptor) {
        console.log(target);
        console.log(methodName);
        console.log(descriptor);
        //修改前保存原始传入的方法
        let originalMethod = descriptor.value;
        //重写传入的方法
        descriptor.value = function (...args) {
            //执行原来的方法
            originalMethod.apply(this, args);
            args = args.map(val => +val);
            console.log(args);
        };
    };
}
let HttpClient = /** @class */ (() => {
    class HttpClient {
        constructor() {
        }
        getApi() {
        }
    }
    __decorate([
        get('http://www.baidu.com')
    ], HttpClient.prototype, "getApi", null);
    return HttpClient;
})();
const http = new HttpClient();
http.getApi('123', '456', '789'); //打印[123, 456, 789]

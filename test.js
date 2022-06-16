// const _ = require('lodash');
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// const axios = require('axios');
// const util = require('util');
// const fs = require('fs');
// const moment = require('moment');
// const asyncHooks = require('async_hooks');
// const moment = require('moment');
// const { v1: uuid } = require('uuid');



// const asyncId = () => asyncHooks.executionAsyncId();
// const triggerAsyncId = () => asyncHooks.triggerAsyncId();

// const syncLog = (...args) => fs.writeFileSync('log.txt', `${util.format(...args)}\n`, { flag: 'a' });
// const hooks = asyncHooks.createHook({
//   init(asyncId, type, triggerAsyncId, resource) {
//     syncLog('init: ', asyncId, type, triggerAsyncId)
//   }
// });
// hooks.enable();
// fs.open('hello.txt', (err, res) => {
//     syncLog(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
// });
// const { AsyncLocalStorage } = require('async_hooks');
// // const asyncLocalStorage = new AsyncLocalStorage();
// // asyncLocalStorage.run({ traceId: 1 }, test1);
// // async function test1() {
// //   setTimeout(() => test2(), 2000);
// // }
// // async function test2() {
// //   console.log(asyncLocalStorage.getStore().traceId);
// // }

// const archiver = require('archiver');
// const fetch = require("node-fetch");

// (async function test (){
//     const output = fs.createWriteStream(__dirname + '/example.zip');
//     const archive = archiver('zip', {
//         zlib: { level: 9 }, // Sets the compression level.
//     });

//     output.on('close', function () {
//         console.log(archive.pointer() + ' total bytes');
//         console.log(
//             'archiver has been finalized and the output file descriptor has closed.'
//         );
//     });

//     output.on('end', function () {
//         console.log('Data has been drained');
//     });

//     archive.on('warning', function (err) {
//         if (err.code === 'ENOENT') {
//             // log warning
//         } else {
//             // throw error
//             throw err;
//         }
//     });

//     archive.on('error', function (err) {
//         throw err;
//     });

//     archive.pipe(output);
//     async function fetchUrl(url) {
//         const response = await fetch(url);
//         return await response.buffer();
//     }
//     const stream = await fetchUrl('http://ayx-oss-kbs.yunxiao.com/dmp/pdfs/ad8cd8922da47b38a2404cc47c98c9ff.pdf')

//     archive.append(stream, { name: 'ad8cd8922da47b38a2404cc47c98c9ff.pdf' });

//     archive.finalize();
// })();
// const arr = [
//     {name: '123'},{name: '123'}
// ]
// const res = _.uniqBy(arr, 'name');

// const a = [{name:1,age:10,sex:1}]
// const b = [{name:1,age: 9,sex:2}]
// const res = _.unionBy(a,b, 'name')

// const str = '| 16  | hfsfd-be               | default     | 0.0.0   | fork    | 28451    | 7D     | 7    | online    | 0%       | 118.5mb  | work     | disabled |'
// const str = '│ 16  │hfsfd-be│|||||'
// const str = '| 16 | hfsfd-be              |'
// const str = 'Doe, John'
// const res = str.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
// const res = str.replace(/^\|\s*\d+\s*\|\s*(\S+)\s*\|.*/, "$1")
// const res = str.replace(/\|\s*(\w+)\s*\|\s*(\S+)\s*\|/, "$2,$1")
// console.log(res);

// const t = require('./t');
// console.log(t);
// let a = 2;
// out:
// for (let i = 0; i< 3; i++){
//     for (let j =0; j < 3; j++) {
//         console.log(j);
//         if (j === 1) break;
//     }
// }
// const _ = require('lodash');
// console.log(!_.isNil(0));

// const data = [
//     { id: 1, name: "办公管理", pid: 0 },
//     { id: 2, name: "请假申请", pid: 1 },
//     { id: 3, name: "出差申请", pid: 1 },
//     { id: 4, name: "请假记录", pid: 2 },
//     { id: 5, name: "系统设置", pid: 0 },
//     { id: 6, name: "权限管理", pid: 5 },
//     { id: 7, name: "用户角色", pid: 6 },
//     { id: 8, name: "菜单设置", pid: 6 },
// ];


// function getTree(data) {
//     const treeMap = {};
//     for (const item of data) {
//         treeMap[item.id] = item;
//     }


//     console.log(treeMap);
//     const resList = [];
//     for (const item of data) {
//         const parent = treeMap[item.pid];
//         if (parent){
//             if (parent.children) {
//                 parent.children.push(item);
//             }else {
//                 parent.children = [item];

//             }
//         } else {
//             resList.push(item);
//         }
//     }
//     return resList;
// }

// function getTree(data) {
// const treeMap = {};
//     for (const item of data) {
//         treeMap[item.id] = item;
//     }

//     const resList = [];
//     for (const item of data) {
//         const parent = deepFind(resList, item.pid);
//         if (parent) {
//             (parent.children || (parent.children = [])).push(item);
//         } else {
//             resList.push(item);
//         }
//     }
//     return resList;
// }


// function deepFind(list, id) {
//     for(let item of list){
//         if (item.id !== id) {
//             if(item.children) {
//                 const result = deepFind(item.children, id);
//                 if (result) return result;
//             }
//         } else {
//             return item;
//         }
//     }
// }
// const res = getTree(data);
// // const res = deepFind(v, 5);
// console.log(res);
// let buf1 = Buffer.from('7468697320697320612074c3a97374', 'hex');
// let buf2 = Buffer.from('baobao');
// let buf3 = Buffer.concat([buf1,buf2]);
// console.log(buf1);
// console.log(buf2)
// console.log(buf3)
// console.log(Math.floor(2.122, 2));
// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }

// async function async2() {
//     console.log('async2')
// }

// console.log('script start')

// setTimeout(function () {
//     console.log('setTimeout0')
// }, 0)

// setTimeout(function () {
//     console.log('setTimeout2')
// }, 300)

// setImmediate(() => console.log('setImmediate'));

// process.nextTick(() => console.log('nextTick1'));

// async1();

// process.nextTick(() => console.log('nextTick2'));

// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve();
//     console.log('promise2')
// }).then(function () {
//     console.log('promise3')
// })

// console.log('script end')

// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nextTick1
// nextTick2
// async1 end
// promise3
// setTimeout0
// setImmediate
// setTimeout2

// 301 moved permanently

// 302  临时重定向
// 304 not modified

// 400 bad request
// 401 not authorized
// 402 
// 403  forbidden
// 404 not found

// 500 internal service error

// 502 bad gateway

// 503 service unavailable
// 并发

// [1,2,3].map(i => {
//     if (i ===2) return;
//     console.log(i);
// })

// rpc grpc
// 单点登录
// auth2
// api限流
// 低代码平台

// nodejs事件循环说一下
//     node有个主线程，上面执行的任务形成一个执行栈，异步任务会有一个任务队列，当执行栈的任务执行完毕后，开始从任务队列里取在等待中的时间，拿回主线程里执行。一直循环这步操作。
//     6个阶段，timer, i/o callback, idle, poll, check, close callback
// 垃圾回收机制
//     多数内存存活时间非常短；
//     新生代空间：一般比较小，回收很快；复制存活的堆内存，从from到to,然后清除from,交换两块内存。处理速度快，一般处理存留事件端的内存
//     老生代空间：经历过新生代空间回收以及to space 内存占比等条件时，内存会被转移到老生代空间，标记清除、整理算法，

// 基本数据类型说一下
//     string,number,boolean,object,null,undefined,symbol,binint
// redis的应用
//     string,hash,set,zset,list
//     缓存 hash
//     队列，list 先进先出
//     互斥锁 setnx
//     排序，zsort
// kafka有没有用过
//     kafka-node
// 微任务和宏任务说一下
//     执行时机不一样，每次循环里有包含多个宏任务，首先执行宏任务，遇到微任务放入队列，宏任务执行完后再一起执行微任务
//     宏任务涉及到进程的切换，不共享上下文，所以会比较慢；事件
//     微任务对应的现成的切换，共享上下文，不存在上下文的切换，所以比较快；process.nextTick  promise.then  async/await
// mysql相关left join right join

// node中间件用过哪些
//     log4js-kafka-node 发消息
//     cookie-parser
//     cors
//     body-parser
//     api-monitor
// 开发团队多大规模
// 组内多少人
// thinkjs mysql你觉得多久可以上手

// gc 算法原理
// 原型链
// 三次握手

// // 客户端向服务端请求，服务端将证书返回给客户端，证书里含公钥和签名，及证书明文信息，用散列函数计算明文信息得到摘要，在用公钥解密签名得到摘要，对比两个摘要信息，一致
// // 则表示公钥可信；


// global.test = 123;
// console.log(test);

// function test() {
//     console.log(222);
// }

// console.log(test instanceof Function);
// function calTimeBetweenTwoDays() {

// }
// 排序


console.log('dddd');
console.log('第二部分');
sssss
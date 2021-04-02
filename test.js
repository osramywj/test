const _ = require('lodash');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const axios = require('axios');
const util = require('util');
const fs = require('fs');
// const moment = require('moment');
// const asyncHooks = require('async_hooks');
const moment = require('moment');
const { v1: uuid } = require('uuid');

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

const archiver = require('archiver');
const fetch = require("node-fetch");

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
// })();sdfsfdsf
sdfsdafsdfsdfsdf
dsfsfd
fsdfsd
console.log(res);

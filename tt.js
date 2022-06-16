// new Promise((res, rej) => {
//   return Promise.reject(new Error(111)).catch(e => console.log(222))
//   // rej(new Error(111));
//   // throw Error(111)
// }).catch(e => {
//   console.log(2222);
// })

// Promise.reject('出错了').catch(e => console.log(e))

// class Person {

//   name = 'yang';
//   say = function () {
//     console.log(this.name);
//   }
// }

// const p = new Person();
// p.say();
// console.log(p);

// const _ = require('lodash');
// const object = {a: undefined, b: null, c: '', d: 0}
// const res = _.omitBy(object, _.isNil);
// console.log(res);
// (async () => {
//   const fsExtra = require('fs-extra');
//   const path = require('path');


//   async function copyAndReplace(src, dist, ignores, options) {
//     await fsExtra.copy(src, dist, { filter: (src) => {
//       console.log(path.basename(src));
//       const basename = path.basename(src);
//       return !ignores.some(item => basename === item);
//     } });

//     await replaceFiles(dist, options);
//   }

//   async function replaceFiles(dir, options) {
//     const files = await fsExtra.readdir(dir);

//     files.forEach(async filename => {
//       const thisPath = path.join(dir, filename);
//       const thisStat = await fsExtra.stat(thisPath);
//       const isFile = thisStat.isFile();
//       if (isFile) {
//         const thisStr = await fsExtra.readFile(thisPath, {encoding: 'utf8'});
//         const reg = new RegExp(options.from, 'g');
//         const newStr = thisStr.replace(reg, options.to);
//         await fsExtra.writeFile(thisPath, newStr, {encoding: 'utf8'});
//         // console.log(thisPath);
//       } else {
//         await replaceFiles(thisPath, options);
//       }
//     });
//   }

//   await copyAndReplace('./extra', './extra_copy', ['a'], {from: '6194d4379b5037590a491ba2', to: '======='})
//   // await replaceFiles('./extra', {from: '6194d4379b5037590a491ba2', to: '======='});
// })()
// const path = require('path');
// const aaa = path.extname('a.js');
// console.log(aaa);
// const a = new Set(['a']);
// a.add('b');
// console.log(a);
const fs = require('fs-extra');
const path = require('path');
const util = require('util');

// (async () => {

// const basename = path.basename('./a/a.txt');

// async function copy(ignores) {
//   await fs.copy('./a', './c', { filter: src => {
//     const basename = path.basename(src);
//     return !ignores.some(item => basename === item);
//   } });
// }

// copy(['b']);
// const mainJsOrigin = await fs.readFile('./demo.js', { encoding: 'utf8' });
// const componentMark = 'foshanTabButton';
// const buildDevReg = new RegExp(componentMark + '/main');
// const mainJsReplacement = mainJsOrigin.replace(buildDevReg, '\./main');

// const optionsPath = path.resolve('demo.json');
// const optionsObj = await fs.readJson(optionsPath);
// optionsObj.components[0].type = '123456';
// await fs.writeJson(optionsPath, optionsObj);

// const releaseMainPath = path.resolve('demo.js');
// const releaseMainOrigin = await fs.readFile(releaseMainPath, { encoding: 'utf8' });
// const componentId = '2222222222222222';
// const initComponentVersion = 'v-current';
// const releaseMainReplacement = releaseMainOrigin.replace(/registerComponentOptionsSetting\((.+?)\,(.+?)\,\sOptionsSetting\);/, `registerComponentOptionsSetting(\'${componentId}\', \'${initComponentVersion}\', OptionsSetting);`)
// .replace(/registerComponentDataSetting\((.+?)\,(.+?)\,\sDataSetting\);/, `registerComponentDataSetting(\'${componentId}\', \'${initComponentVersion}\', DataSetting);`);
// console.log(releaseMainReplacement);
// .replace(/registerComponentDataSetting\)\((\"|\')(.+?)(\"|\')\,(.+?)\)/g, `registerComponentDataSetting)(\'${componentId}\',\'v1.0.0\',$4\)`);
// console.log(releaseMainReplacement);
// .replace(/registerComponentDataSetting\)\((\"|\')\w+(\"|\')\,(.+?)\)/, `registerComponentDataSetting)(\'${componentId}\',\'v1.0.0\',$3\)`);
// const releaseMainReplacement = releaseMainOrigin.replace(/registerComponent\)\((\"|\')\w+(\"|\')\,(.+?)\)/g, `registerComponent)(\'${componentId}\',\'v1.0.0\',$3)`);
// console.log(releaseMainReplacement);
// await fs.writeFile(releaseMainPath, releaseMainReplacement);
// console.log(mainJsReplacement);
// const coverSource = path.resolve('./test.jpg');
// const coverTarget = path.resolve('./cover.png');
// await fs.copy(coverSource, coverTarget);

// const exec = util.promisify(require('child_process').exec);
// await exec('npm i');

// console.log(3333333);
// async function replaceFiles(dir, options) {
//   const files = await fs.readdir(dir);

//   files.forEach(async filename => {
//     const thisPath = path.join(dir, filename);
//     const imgMatch = /\.(jpe?g|gif|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/.test(filename);
//     if (imgMatch) return;
//     const thisStat = await fs.stat(thisPath);
//     const isFile = thisStat.isFile();
//     if (isFile) {
//       const thisStr = await fs.readFile(thisPath, { encoding: 'utf8' });
//       const reg = new RegExp(options.from, 'g');
//       const newStr = thisStr.replace(reg, options.to);
//       await fs.writeFile(thisPath, newStr, { encoding: 'utf8' });
//     } else {
//       await replaceFiles(thisPath, options);
//     }
//   });
// }
// await replaceFiles('./img', {from: '1',to: '2'});

// })()

// import { a } from '@/t';
// const { a } = require('@/t')

const a = 1;
const b = a + 1;
b
// console.log(a + 1);
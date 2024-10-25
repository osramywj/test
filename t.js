// function Person(name) {
//     this.name = name
//     return this // 其实这行可以不写，默认返回 this 对象
//   }

//   var nick = new Person("nick")
// console.log(nick.__proto__ === Person.prototype);
// console.log(Person.prototype.constructor === Person);

// console.log(typeof nick);

// function  instance_of(L, R) {
//     const baseTypes = ['string', 'number', 'boolean', 'null', 'undefined', 'symbol'];
//     if (baseTypes.includes(typeof L)) return false;

//     let _proto = L.__proto__;
//     let prototype = R.prototype;

//     while(true) {
//         if (_proto === null) {
//             return false;
//         } 
//         if (_proto === prototype){
//             return true
//         }

//         _proto = _proto.__proto__;
//     }
// }

// const res = instance_of(nick, Person);
// console.log(res);

// function Foo(name) {
//     this.name = name;
// }
// var f = new Foo('nick')

// f instanceof Foo // true
// f instanceof Object // true
// console.log(f.__proto__);

// function Foo() {

// }
// const foo = new Foo();
// console.log(Foo);
// console.log(typeof Foo);
// const res = Foo.__proto__.__proto__ === Object.prototype
// const obj4 = new new Function();
// function fun1(){};
// const fun2 = function(){};
// const fun3 = new Function('name','console.log(name)');

// const obj1 = {};
// const obj2 = new Object();
// const obj3 = new fun1();
// const obj4 = new new Function();
// console.log(typeof fun1);
// console.log(Function.__proto__ === Function.prototype);

// function Person(){};
// let nealyang = new Person();
// const obj = new Object();
// console.log(Person.prototype.__proto__.get);

// Object.defineProperty(Object.prototype,'__proto__',{
//   get(){
//     console.log('get')
//     return 333;
//   }
// });

// ({}).__proto__;
// console.log(Object.prototype.__proto__.get);
// console.log((new Object()).__proto__);

// function C(){}
// function D(){}

// var o = new C();

// console.log(o.__proto__ === C.prototype);
// console.log(Object instanceof Function);
// console.log(typeof null);
// function C(){}
// function D(){}

// var o = new C();


// o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype

// o instanceof D; // false，因为 D.prototype 不在 o 的原型链上

// o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
// C.prototype instanceof Object// true，同上

// C.prototype = {};
// var o2 = new C();

// o2 instanceof C; // true

// o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

// D.prototype = new C(); // 继承
// var o3 = new D();
// o3 instanceof D; // true
// o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上

// console.log(D.prototype.__proto__ === C.prototype);
// function Person(name,age){
//   this.name = name;
//   this.age = age;
//   this.sex = 'male';
// }


// Person.prototype.isHandsome = true;


// Person.prototype.sayName = function(){
//   console.log(`Hello , my name is ${this.name}`);
// }


// let handsomeBoy = new Person('Nealyang',25);

// console.log(handsomeBoy.name) // Nealyang
// console.log(handsomeBoy.sex) // male
// console.log(handsomeBoy.isHandsome) // true

// handsomeBoy.sayName(); // Hello , my name is Nealyang
// function Person(name,age){
//   this.name = name;
//   this.age = age;

//   this.sex = 'male';
//   }

//   function objectFactory() {

//     let obj = new Object(),//从Object.prototype上克隆一个对象

//     Constructor = [].shift.call(arguments);//取得外部传入的构造器

//     const F=function(){};
//     F.prototype= Constructor.prototype;
//     obj=new F();//指向正确的原型

//     Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

//     return obj;//返回 obj
// };
// const res = objectFactory(Person,'Nealyang',25);

// function Person(name,age){
//   this.name = name;
//   this.age = age;

//   this.sex = 'male';
// }


// Person.prototype.isHandsome = true;


// Person.prototype.sayName = function(){
//   console.log(`Hello , my name is ${this.name}`);
// }


// function objectFactory() {

//   let obj = new Object(),//从Object.prototype上克隆一个对象

//   Constructor = [].shift.call(arguments);//取得外部传入的构造器

//   console.log({Constructor})

//   const F=function(){};
//   F.prototype= Constructor.prototype;
//   obj=new F();//指向正确的原型
//   // obj = new Constructor();

//   Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

//   return obj;//返回 obj
// };

// let handsomeBoy = objectFactory(Person,'Nealyang',25);

// console.log(handsomeBoy.name) // Nealyang
// console.log(handsomeBoy.sex) // male
// console.log(handsomeBoy.isHandsome) // true

// handsomeBoy.sayName(); // Hello , my name is Nealyang
// console.log(res);

// function SuperClass() {
//   this.superValue = true;
// }
// SuperClass.prototype.getSuperValue = function() {
//   return this.superValue;
// }


// function SubClass() {
//   this.subValue = false;
// }
// SubClass.prototype = new SuperClass();



// SubClass.prototype.getSubValue = function() {
//   return this.subValue;
// }

// var instance = new SubClass();


// console.log(instance instanceof SuperClass)//true
// console.log(instance instanceof SubClass)//true
// console.log(SubClass instanceof SuperClass)//false
// function SuperClass(id) {
//   this.books = ['js','css'];
//   this.id = id;
// }
// SuperClass.prototype.showBooks = function() {
//   console.log(this.books);
// }
// function SubClass(id) {
//   //继承父类
//   SuperClass.call(this,id);
//   this.__proto__ = SuperClass.prototype;
// }
// //创建第一个子类实例
// var instance1 = new SubClass(10);
// //创建第二个子类实例
// var instance2 = new SubClass(11);


// instance1.books.push('html');
// console.log(instance1)
// console.log(instance2)
// instance1.showBooks();//TypeError

// function SuperClass(name) {
//   this.name = name;
//   this.books = ['Js','CSS'];
// }
// SuperClass.prototype.getBooks = function() {
//   console.log(this.books);
// }
// function SubClass(name,time) {
//   SuperClass.call(this,name);
//   this.time = time;
// }
// SubClass.prototype = new SuperClass();


// SubClass.prototype.getTime = function() {
//   console.log(this.time);
// }
// function inheritObject(o) {
//   //声明一个过渡对象
//   function F() { }


//   //过渡对象的原型继承父对象
//   F.prototype = o;


//   //返回过渡对象的实例，该对象的原型继承了父对象
//   return new F();
// }

// var book = {
//   name:'js book',
//   likeBook:['css Book','html book']
// }

// function createBook(obj) {
//   //通过原型方式创建新的对象
//   var o = new inheritObject(obj);
//   // 拓展新对象
//   o.getName = function(name) {
//       console.log(name)
//   }
//   // 返回拓展后的新对象
//   return o;
// }

// var newBook = createBook(book);
// newBook.name = 'ajax book';
// newBook.likeBook.push('react book');
// var otherBook = createBook(book);
// otherBook.name = 'canvas book';
// otherBook.likeBook.push('node book');
// console.log(newBook,otherBook);
// setTimeout(() => {
//   console.log('timeout0');
//   process.nextTick(() => {
//       console.log('nextTick1');
//       process.nextTick(() => {
//           console.log('nextTick2');
//       });
//   });
//   process.nextTick(() => {
//       console.log('nextTick3');
//   });
//   console.log('sync');
//   setTimeout(() => {
//       console.log('timeout2');
//   }, 0);
// }, 0);

// timeout0  sync nextTick1 nextTick2  nextTick3 timeout2

// const fs = require('fs');
// const JSONStream = require('JSONStream');
// const es = require('event-stream');

// (async () => {
//   const readable = fs.createReadStream('./1.json', {
//     encoding: 'utf8',
//     highWaterMark: 10
//   })
//   const parser = JSONStream.parse('rows.*.doc');
//   readable.pipe(parser).pipe(es.mapSync(function(data) {
//     console.log(data);
//   }));
//   parser.on('data', function(data) {
//     console.log(data);
//   });
// })()
// const a = {};

// console.log('' ?? 5);
// let x;
// console.log(x??=2);
// module.exports = {
//   a: 1,
//   test: () => {}
// }

// function test(list){
//   for (let i of list) {
//     if (i === 2) return i;
//   }
// }


// const res = new Function()

// // console.log(res.__proto__ === Function.prototype);
// // console.log(Function.__proto__ === Function.prototype);
// console.log(typeof res);
// function Person(name,age){
//   this.name = name;
//   this.age = age;

//   this.sex = 'male';
// }


// Person.prototype.isHandsome = true;


// Person.prototype.sayName = function(){
//   console.log(`Hello , my name is ${this.name}`);
// }




// function objectFactory() {

//   let obj = new Object(),//从Object.prototype上克隆一个对象

//   Constructor = [].shift.call(arguments);//取得外部传入的构造器

//   console.log({Constructor})

//   const F=function(){};
//   F.prototype= Constructor.prototype;
//   obj=new F();//指向正确的原型

//   Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

//   return obj;//返回 obj
// };

// let handsomeBoy = objectFactory(Person,'Nealyang',25);

// console.log(handsomeBoy.name) // Nealyang
// console.log(handsomeBoy.sex) // male
// console.log(handsomeBoy.isHandsome) // true

// handsomeBoy.sayName(); // Hello , my name is Nealyang


// const { request } = require('express');
// const heapdump = require('heapdump');
// heapdump.writeSnapshot(function(err, filename) {
//   console.log('dump written to', filename);
// });

// 200 成功
// 301 moved permanently
// 302 
// 304 not modified

// 400 bad request
// 401 unauthorized
// 402 
// 403 forbidden
// 404 not found

// 500 internel server error
// 502 bad gateway
// 503 service unavailable
// const chunks = [];
// for (let i=0; i<10; i++){
//   // console.log(Buffer.from(i + ''));
//   chunks.push(Buffer.from(i + ''));
// }


// const chunk = Buffer.concat(chunks)
// console.log(Buffer.from(JSON.stringify(chunk.toString())).toString());



/*
 * Complete the 'getMin' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

// const profiler = require('v8-profiler-next');
// const fs = require('fs');

// const v8Profiler = require('v8-profiler-next');
// const title = 'good-name';
// // ex. 5 mins cpu profile
// v8Profiler.startProfiling(title, true);
// setTimeout(() => {
//   const profile = v8Profiler.stopProfiling(title);
//   profile.export(function (error, result) {
//     // if it doesn't have the extension .cpuprofile then
//     // chrome's profiler tool won't like it.
//     // examine the profile:
//     //   Navigate to chrome://inspect
//     //   Click Open dedicated DevTools for Node
//     //   Select the profiler tab
//     //   Load your file
//     fs.writeFileSync(`${title}.cpuprofile`, result);
//     profile.delete();
//   });
// },  60 * 1000);

// let a = 11;
// console.log(a);
// function getZhishu(num) {
//   const res = []
//   for(let i=2; i<= num; i++){
//       let flag = true;
//       for (let j = 2; j< i; j++){
//           if (i%j === 0) flag = false;
//       }
//       if (flag) res.push(i);
//   }
//   return res;
// }
// const _ = require('lodash');

// function getZhishu(num) {
//   const res = [];
//   outer:
//   for(let i=2; i<= num; i++){
//       for (let j = 2; j<= Math.sqrt(i); j++){
//           if (i%j === 0) continue outer;
//       }
//       res.push(i);
//   }
//   return res;
// }

// console.log(getZhishu(10));

// const a = require('./test2');
// console.log(a);
// const connect = require('connect')

// const app = connect()

// app.use(function m1 (req, res, next) {
//   console.log('m1')
//   next()
//   console.log('m1 end')
// })

// app.use(function m2 (req, res, next) {
//   console.log('m2')
//   next()
//   console.log('m2 end')
// })

// app.use(function m3 (req, res, next) {
//   console.log('m3')
//   setTimeout(() => {
//     console.log('loading 5s');
//   }, 5000)
//   res.end('hello')
// })

// app.listen(8080)

// const Koa = require('koa')
// const fsPromise = require('fs/promises');

// const app = new Koa()

// app.use(async function m1 (ctx, next) {
//   console.log('m1')
//   await next()
//   console.log('m1 end')
// })

// app.use(async function m2 (ctx, next) {
//   console.log('m2')
//   await next()
//   console.log('m2 end')
// })

// app.use(async function m3 (ctx, next) {
//   console.log('m3')
//   const res = await fsPromise.readFile('./test.json');
//   await next();
//   console.log(res);
//   ctx.body = 'hello'
// })

// app.listen(8080)
// console.log(app);
// console.log(String.__proto__ === Function.prototype);
// function Foo(){

// }

// const foo = new Foo();
// const object1 = {};
// Object.defineProperty(object1, 'property1', {
//   value: 42,
// });
// object1.property1 = 99;
// console.log(object1.property1);


// function Person(){
//   this.name = 'person';
//   // this.say = function(){
//   //   console.log('inner');
//   // }
// }
// Person.prototype.say = function(){
//   console.log('hello');
// }

// const man = new Person();
// man.say();
// const me = Object.create(Person);

// // me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
// // me.isHuman = true; // inherited properties can be overwritten
// console.log(me.__proto__ === Person);
// console.log(me.constructor);


// function getName() {
//   console.log(5);
// }
// getName()


// var getName = function() {
//   console.log(4);
// };
// const moment = require('moment');

// console.log(moment(moment(1622476800000).format('YYYY-MM-DD')).toDate().valueOf() + 4 * 60 * 60 * 1000 >= moment('2021-07-01').valueOf());
// var a = 0;
// console.log(Boolean(a=0))
// function getSum(num1, num2, num3) {
// return ;
// }
// console.log(getSum(1, 2, 3));

// 5,4,3,2,1   0
// 4,3,2,1,5   1
// 3,2,1,4,5   2
// function sort(arr) {
//   for(let i=0; i<arr.length; i++) {
//     for (let j= i+1; j< arr.length; j++) {
//         let tmp;
//         if (arr[i] > arr[j]) {
//           tmp = arr[i];
//           arr[i] = arr[j];
//           arr[j] = tmp;
//         }
//     }
//   }
//   return arr;
// }

// j   j+1
// 10    8
// function sort2(arr) {
//   for(let i=0;i<arr.length-1;i++) {
//     for(let j=0;j<arr.length-1-i;j++){
//       if (arr[j+1] <arr[j]) {
//         tmp = arr[j+1];
//         arr[j+1] = arr[j];
//         arr[j] = tmp
//       }
//     }
//   }
//   return arr;
// }

// const res = sort2([5,4,3,2,1]);
// console.log(res);
// const http = require('http');
// const fs = require('fs');

// http.createServer((req, res) => {
//   const url = req.url;
//   console.log();
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
//   if (url === '/health') {
//     res.end('hello');
//   }else if(url === '/'){
//     res.setHeader('content-type', 'text/html');
//     const data = fs.readFileSync('./FE/01/index.html');
//     res.end(data);
//   }else if (url === '/post'){
//     const body = [];
//     req.on('data', function(chunk) {
//       body.push(chunk);
//     });
//     req.on('end', function () {
//       res.end(body.toString());
//     })
//   }

// }).listen(8080);

// function Fun(){

// }
// Fun.prototype.test = function (){
//   console.log(322);
// }
// const fn = new Fun();
// // fn.test();
// fn.__proto__.test()
// console.log();
// console.log(Fun.prototype);
// function Foo() {
//   this.name = 'foo';
// }
// Foo.getName = function() {
//   alert(2);
// };

// const foo = new Foo();
// console.log(foo.getName()); // foo.getName is not a function

// var a=3;
// function fn(){
//   console.log(a);
//   var a=4;
// }

// fn();
// function SuperMan(name){
//   this.name = name
// }
// SuperMan.prototype.say = function(){
//   console.log(this.name);
// }
// function SubMan(name){
//   this.name = name
// }
// SubMan.prototype = new SuperMan('yang');
// SubMan.prototype.run = function(){
//   console.log(this.name);
// }

// SubMan.prototype.constructor = SubMan;

// const sub = new SubMan('yang')
// // sub.say();
// console.log(sub.constructor  );

// function getWeek(n){
//   return Math.floor((n+3)/7) + 1;
// }

// for(let i in 4){
// console.log(i);           
// }
// const moment = require('moment');
// console.log(moment('2021-01-03').isoWeek());
// console.log(moment('2021-01-04').subtract(1, 'd').week());
// console.log(get(11));




// const arr = [{
//   name: 'yang',age: 11
// },
// {
//   name: 'wen',age: 10
// }]

// const res = arr.sort((o1, o2) => o2.age - o1.age).map(item => item.age);
// console.log(res);
// const moment = require('moment');
// const res = moment(1630252800000).subtract(1, 'd').week();
// console.log(res);
// const res = JSON.parse(null);
// console.log(res);
// const str = 'applications/61b04779adf76cbdba1f819b/9018bcdb-b2aa-4a07-906c-f1c540a376ca.jpg'
// const aaa = str.replace(/applications\/\w{24}\/(.*)/, `applications/${222222}/$1`);
// console.log(aaa);
// const str = 'q=searchParams&topic=api';
// const url = new URL('https://www.cnblogs.com/lanshu123/p/10668320.html');
// console.log(url);
// const ip = require('ip');
// console.log(ip.address());
// const { camelizeKeys, decamelizeKeys } = require('humps');

// const obj = {
//   "pages" : [
//     {
//       "components" : {
//         colors: {
//           '0.3': {
//             type: 'linear'
//           }
//         }
//       }
//     }
//   ]
// }

// const res = decamelizeKeys(obj);
// console.log(JSON.stringify(res));
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());
// const cateParentMap = {
//   55: 4,
//   131: 4,
//   132: 55,
//   144: 132,
//   156: 144
// }

// const firstCates = [55,131];

// function findFirstCate(id, cateParentMap, firstCates) {
//   if (firstCates.includes(id)) return id;
//   return findFirstCate(cateParentMap[id], cateParentMap, firstCates);
// }

// console.log(findFirstCate(156, cateParentMap, firstCates));
// const arr = [
// {a: 1},
// {a: 2}
// ];
// console.log(_.find(arr, {a:2}).a);
// const str = '/gatewayApi/dodp/v1/apiData/01f1afc825754778a3076b12b40b9d99/query';
// const res = str.replace(/\/gatewayApi\/dodp/, '');
// console.log(res);
// const a  = ['a','b','c'];
// for (const [aa, bb] of a.entries()) {
//   console.log(aa, bb);
// }
// const _ = require('lodash');
// console.log(_.isEmpty({ a: 1 }));
const list = [
  {
    "components": [
      {
        "config": {
          "height": 50,
          "index": 1,
          "left": 714,
          "name": "标题",
          "top": 3,
          "visible": true,
          "width": 496
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "PVIQ-PU91-FMH4-EOJR-AQ4G-BN2M",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 24,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "数据大数据可视化平台-公安"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 2,
          "left": 33,
          "name": "标题 复制",
          "top": 105,
          "visible": true,
          "width": 338
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "UH3C-C2F1-FMH4-JHUA-9RJB-K9U0",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "flex-start",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-1"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 3,
          "left": 34.13906382978723,
          "name": "标题 复制(1)",
          "top": 426.77497872340433,
          "visible": true,
          "width": 338
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "2I03-TF61-FMH4-MK1M-14RD-2G88",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "flex-start",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-2"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 4,
          "left": 17,
          "name": "标题 复制(2)",
          "top": 741,
          "visible": true,
          "width": 451
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "PJ2B-8N31-FMH4-N56M-AA8F-98H7",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-3"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 5,
          "left": 495.61855319148947,
          "name": "标题 复制(3)",
          "top": 739.1610212765958,
          "visible": true,
          "width": 451
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "LIH7-MN91-FMH4-O3CL-09QJ-72OO",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-4"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 6,
          "left": 973.2590638297875,
          "name": "标题 复制(4)",
          "top": 739.3074042553192,
          "visible": true,
          "width": 451
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "8MOH-5SU1-FMH4-OGB6-3CMP-OKQK",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-5"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 7,
          "left": 1452.5511541722078,
          "name": "标题 复制(5)",
          "top": 739.4537872340426,
          "visible": true,
          "width": 451
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "ETM4-KT21-FMH4-OTN3-52O8-ASND",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-6"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 8,
          "left": 1547.1310638297878,
          "name": "标题 复制(6)",
          "top": 425.92868085106386,
          "visible": true,
          "width": 338
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "IHFK-T7D1-FMH4-PTCM-226P-13OP",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "flex-end",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-7"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 9,
          "left": 1550.2554893617028,
          "name": "标题 复制(7)",
          "top": 102.4611063829787,
          "visible": true,
          "width": 338
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "KQ03-ARA1-FMH4-QRVJ-DBEI-1BJ9",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "flex-end",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-8"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 41,
          "index": 10,
          "left": 557.2818723404256,
          "name": "标题 复制(8)",
          "top": 132.94144680851065,
          "visible": true,
          "width": 338
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"title\": \"标题\",\n        \"text\": 123\n    }\n}"
          },
          "type": "json"
        },
        "id": "201B-HHE1-FMH4-RTRA-1K8T-T94V",
        "options": {
          "alignItems": "center",
          "color": "#6FC4FF",
          "fontFamily": "inherit",
          "fontSize": 16,
          "fontWeight": 300,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "flex-start",
          "style": ".ff-component-title { border: none; }",
          "text": "公安数据指标-9"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 523,
          "index": 11,
          "left": 522,
          "name": "地理地图",
          "top": 155,
          "visible": true,
          "width": 878
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": [\n        {\n            \"value\": 20,\n            \"name\": \"北京\"\n        },\n        {\n            \"value\": 60,\n            \"name\": \"包头\"\n        },\n        {\n            \"value\": 100,\n            \"name\": \"长春\"\n        },\n        {\n            \"value\": 20,\n            \"name\": \"大连\"\n        },\n        {\n            \"value\": 80,\n            \"name\": \"上海\"\n        },\n        {\n            \"value\": 70,\n            \"name\": \"南昌\"\n        },\n        {\n            \"value\": 40,\n            \"name\": \"重庆\"\n        },\n        {\n            \"value\": 30,\n            \"name\": \"南宁\"\n        },\n        {\n            \"value\": 10,\n            \"name\": \"广州\"\n        },\n        {\n            \"value\": 40,\n            \"name\": \"拉萨\"\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "RGFU-26R1-FMH4-UDA1-HT93-IEFD",
        "options": {
          "chooseMap": "China",
          "color": [],
          "emphasis": {},
          "functions": {},
          "geo": {
            "aspectScale": 0.9,
            "emphasis": {
              "itemStyle": {
                "color": "#A6BFE4"
              }
            },
            "label": {
              "color": "#A6BFE4",
              "textBorderColor": "#A6BFE4",
              "textBorderWidth": 0
            },
            "zoom": 1.2
          },
          "grid": {
            "bottom": "10%",
            "left": "10%",
            "right": "10%",
            "top": "10%"
          },
          "image": "/lcapWeb/www/",
          "mapLines": {
            "lineStyle": {
              "color": "#E36D6F",
              "type": "dotted"
            },
            "showAllSymbol": true,
            "showSymbol": false,
            "symbol": "circle"
          },
          "mapScatter": {
            "animation": true,
            "itemStyle": {
              "opacity": 1
            },
            "symbol": "circle"
          },
          "maps": [],
          "options": {},
          "select": {},
          "series": {},
          "title": {},
          "tooltip": {
            "alwaysShowContent": false,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "trigger": "item",
            "triggerOn": "mousemove|click"
          }
        },
        "type": "61aa27abd39bdf74f6d60149",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 57,
          "index": 12,
          "left": 1115.825059101655,
          "name": "数字组件",
          "top": 614.4349881796691,
          "visible": true,
          "width": 273
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"value\": 8380,\n    \"unit\": \"\"\n}"
          },
          "type": "json"
        },
        "id": "JGP7-P1F1-FMH5-262M-RRJF-J5E0",
        "options": {
          "animationType": "scroll",
          "displayGap": 25,
          "displayStyle": {
            "background": "#00c1ff",
            "fontFamily": "UnidreamLED",
            "fontSize": 50,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "lineHeight": 0.7
          },
          "displayWidth": 35,
          "image": "/lcapWeb/www/",
          "minDisplayNumber": 4,
          "unitStyle": {
            "color": "#15f6ff",
            "fontSize": 30,
            "fontStyle": "normal",
            "fontWeight": "normal"
          }
        },
        "type": "61aa27acd39bdf74f6d60307",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 276,
          "index": 13,
          "left": 972,
          "name": "趋势图",
          "top": 789,
          "visible": true,
          "width": 453
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"xAxis\": [\n        \"北京\",\n        \"天津\",\n        \"上海\",\n        \"重庆\",\n        \"广东\",\n        \"河北\",\n        \"山东\"\n    ],\n    \"data\": [\n        {\n            \"name\": \"Max\",\n            \"data\": [\n                5,\n                27,\n                22,\n                70,\n                40,\n                49,\n                20\n            ]\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "SL9S-I5E1-FMH5-GT1P-P9PV-ET54",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "label": {
              "color": "#9CAFC3",
              "fontSize": 12
            },
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            {
              "angle": 90,
              "colorStops": [
                {
                  "active": false,
                  "color": "rgb(56, 164, 251)",
                  "id": 1,
                  "offset": 0,
                  "opacity": 1
                },
                {
                  "active": true,
                  "color": "rgba(0, 0, 0, 0)",
                  "id": 2,
                  "offset": 1,
                  "opacity": 0
                }
              ],
              "type": "linear",
              "x": 0,
              "x2": 0,
              "y": 0,
              "y2": 1
            }
          ],
          "functions": {},
          "grid": {
            "bottom": "20%",
            "left": "10%",
            "right": "5%",
            "show": false,
            "top": "20%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "icon": "circle",
            "itemGap": 15,
            "left": "83%",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9AABBD"
            },
            "right": "5%",
            "show": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#9CAFC3",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": "7%",
            "type": "plain"
          },
          "options": {},
          "series": {
            "clip": true,
            "connectNulls": true,
            "lineStyle": {
              "color": "#3891FF"
            },
            "showAllSymbol": true,
            "showSymbol": true,
            "step": false,
            "symbol": "circle",
            "symbolSize": 5
          },
          "textStyle": {
            "bottom": "10%",
            "color": "#9AABBD",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "top": "10%"
          },
          "title": {
            "left": 10,
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "target": "blank",
            "textStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": 10
          },
          "tooltip": {
            "alwaysShowContent": false,
            "backgroundColor": "#485465",
            "borderWidth": 0,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "position": "top",
            "show": true,
            "showContent": true,
            "showDelay": 0,
            "textStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "trigger": "item",
            "triggerOn": "mousemove|click"
          },
          "xAxis": {
            "axisLabel": {
              "color": "#64768E",
              "fontSize": 12,
              "inside": false,
              "show": true
            },
            "axisLine": {
              "lineStyle": {
                "color": "#485465"
              },
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "show": true,
            "splitLine": {
              "lineStyle": {
                "color": "#485465"
              }
            },
            "type": "category"
          },
          "yAxis": {
            "axisLabel": {
              "inside": false,
              "show": true
            },
            "interval": 25,
            "inverse": false,
            "max": 125,
            "nameGap": 15,
            "nameLocation": "end",
            "position": "left",
            "realtimeSort": false,
            "scale": false,
            "show": true,
            "splitLine": {
              "lineStyle": {
                "color": [
                  "#485465"
                ]
              },
              "show": true
            },
            "splitNumber": 5,
            "type": "value"
          }
        },
        "type": "61aa27abd39bdf74f6d600b8",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 232,
          "index": 14,
          "left": 21,
          "name": "基础柱状图",
          "top": 152,
          "visible": true,
          "width": 431
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"xAxis\": [\n        \"北京\",\n        \"天津\",\n        \"上海\",\n        \"重庆\",\n        \"广东\",\n        \"河北\",\n        \"山东\"\n    ],\n    \"data\": [\n        {\n            \"name\": \"Max\",\n            \"data\": [\n               70,\n                45,\n                35,\n                65,\n                60,\n                40,\n                45\n            ]\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "TVGC-1481-FMH6-PGHF-895G-EBV8",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            {
              "angle": 90,
              "colorStops": [
                {
                  "active": false,
                  "color": "rgb(118, 221, 251)",
                  "id": 1,
                  "offset": 0,
                  "opacity": 1
                },
                {
                  "active": true,
                  "color": "rgb(11, 120, 227)",
                  "id": 2,
                  "offset": 1,
                  "opacity": 1
                }
              ],
              "type": "linear",
              "x": 0,
              "x2": 0,
              "y": 0,
              "y2": 1
            }
          ],
          "functions": {},
          "grid": {
            "bottom": "10%",
            "left": "10%",
            "right": "5%",
            "show": false,
            "top": "20%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "height": "10",
            "itemHeight": 10,
            "itemStyle": {
              "borderRadius": 5000
            },
            "itemWidth": 10,
            "left": "85%",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9aabbd"
            },
            "show": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#64768E",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "top": "5%",
            "type": "plain",
            "width": "10"
          },
          "options": {},
          "series": {
            "barMaxWidth": 20
          },
          "textStyle": {
            "bottom": "10%",
            "color": "#9aabbd",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "textAlign": "auto",
            "textVerticalAlign": "auto",
            "top": "10%"
          },
          "title": {
            "left": 10,
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "target": "blank",
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "top": 10
          },
          "tooltip": {
            "alwaysShowContent": false,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "trigger": "item",
            "triggerOn": "mousemove|click"
          },
          "xAxis": {
            "axisLabel": {
              "inside": false,
              "show": true
            },
            "axisTick": {
              "show": false
            },
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "show": true,
            "type": "category"
          },
          "yAxis": {
            "axisLabel": {
              "inside": false,
              "show": true
            },
            "interval": 25,
            "inverse": false,
            "max": 100,
            "name": "pm/kg",
            "nameGap": " 20",
            "nameLocation": "end",
            "nameTextStyle": {
              "fontSize": 12,
              "textShadowOffsetX": -9
            },
            "position": "left",
            "realtimeSort": false,
            "scale": false,
            "show": true,
            "splitLine": {
              "lineStyle": {
                "color": [
                  "#485465"
                ]
              },
              "show": true
            },
            "splitNumber": 5,
            "type": "value"
          }
        },
        "type": "61aa27abd39bdf74f6d600b7",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 242,
          "index": 15,
          "left": 14,
          "name": "折线柱状图混合",
          "top": 472,
          "visible": true,
          "width": 439
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"xAxis\": [\n        \"Jan\",\n        \"Feb\",\n        \"May\",\n        \"Apr\",\n        \"May\",\n        \"Jun\",\n        \"Jul\",\n        \"Aug\",\n        \"Sep\",\n        \"Oct\",\n        \"Nov\",\n        \"Dec\"\n    ],\n    \"data\": [\n        {\n            \"type\": \"bar\",\n            \"data\": [\n                10,\n                15,\n                23,\n                18,\n                19,\n                18,\n                16,\n                10,\n                23,\n                16,\n                13,\n                10\n            ]\n        },\n        {\n            \"type\": \"line\",\n            \"data\": [\n                90,\n                75,\n                55,\n                60,\n                70,\n                80,\n                90,\n                105,\n                100,\n                80,\n                70,\n                40\n            ]\n        }\n    ],\n    \"legendData\": [\n        \"Rainfail\",\n        \"Temperature\"\n    ]\n}"
          },
          "type": "json"
        },
        "id": "BOR8-1211-FMHF-L9AS-CVIK-LOH5",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            {
              "angle": 90,
              "colorStops": [
                {
                  "active": false,
                  "color": "rgb(118, 221, 251)",
                  "id": 1,
                  "offset": 0,
                  "opacity": 1
                },
                {
                  "active": true,
                  "color": "rgb(11, 120, 227)",
                  "id": 2,
                  "offset": 1,
                  "opacity": 1
                }
              ],
              "type": "linear",
              "x": 0,
              "x2": 0,
              "y": 0,
              "y2": 1
            }
          ],
          "functions": {},
          "grid": {
            "bottom": "18%",
            "left": "10%",
            "right": "10%",
            "show": false,
            "top": "20%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "itemHeight": 10,
            "itemWidth": 10,
            "left": "60%",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9aabbd"
            },
            "show": true,
            "textStyle": {
              "bottom": "18%",
              "color": "#9CAFC3",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "13%"
            },
            "top": "5%",
            "type": "plain",
            "y": "90%"
          },
          "options": {},
          "series": {},
          "textStyle": {
            "bottom": "18%",
            "color": "#9aabbd",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "textAlign": "auto",
            "textVerticalAlign": "auto",
            "top": "13%"
          },
          "title": {
            "left": 10,
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "18%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "13%"
            },
            "target": "blank",
            "textStyle": {
              "bottom": "18%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "13%"
            },
            "top": 10
          },
          "tooltip": {
            "axisPointer": {
              "type": "shadow"
            },
            "textStyle": {
              "bottom": "18%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "13%"
            },
            "trigger": "axis"
          },
          "xAxis": {
            "axisLabel": {
              "color": "#64768E",
              "fontSize": 12,
              "inside": false,
              "show": true
            },
            "axisPointer": {
              "show": true
            },
            "axisTick": {
              "show": false
            },
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "show": true,
            "type": "category"
          },
          "yAxis": [
            {
              "axisLabel": {
                "color": "#64768E",
                "fontSize": 12,
                "inside": false,
                "interval": 0,
                "show": true
              },
              "interval": 10,
              "inverse": false,
              "max": 30,
              "nameLocation": "end",
              "nameTextStyle": {
                "color": "#64768E",
                "fontSize": 12
              },
              "position": "left",
              "realtimeSort": false,
              "scale": false,
              "show": true,
              "splitLine": {
                "lineStyle": {
                  "color": [
                    "#315070"
                  ]
                },
                "show": true
              },
              "splitNumber": 5,
              "type": "value"
            },
            {
              "axisLabel": {
                "color": "#64768E",
                "fontSize": 12,
                "inside": false,
                "show": true
              },
              "interval": 50,
              "inverse": false,
              "max": 150,
              "nameTextStyle": {
                "color": "#64768E",
                "fontSize": 12
              },
              "position": "right",
              "realtimeSort": false,
              "scale": false,
              "show": true,
              "splitLine": {
                "show": false
              },
              "splitNumber": 5
            }
          ]
        },
        "type": "61aa27acd39bdf74f6d602de",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 290,
          "index": 16,
          "left": 12,
          "name": "趋势图",
          "top": 781,
          "visible": true,
          "width": 454
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"xAxis\": [\n        \"一\",\n        \"二\",\n        \"三\",\n        \"四\",\n        \"五\",\n        \"六\",\n        \"七\",\n        \"八\",\n        \"九\",\n        \"十\",\n        \"十一\",\n        \"十二\"\n    ],\n    \"data\": [\n        {\n            \"name\": \"北京\",\n            \"data\": [\n                50,\n                30,\n                24,\n                18,\n                35,\n                -47,\n                150,\n                20,\n                130,\n                20,\n                130,\n                120\n            ]\n        },\n        {\n            \"name\": \"河北\",\n            \"data\": [\n                150,\n                10,\n                23,\n                -24,\n                108,\n                135,\n                147,\n                130,\n                120,\n                110,\n                80,\n                60\n            ]\n        },\n        {\n            \"name\": \"天津\",\n            \"data\": [\n                120,\n                110,\n                123,\n                124,\n                8,\n                -35,\n                47,\n                120,\n                120,\n                110,\n                80,\n                60\n            ]\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "2POT-B8N1-FMHH-5LTO-F1GS-08A9",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            "#FF2366",
            "#3891FF",
            "#1FDFE9"
          ],
          "functions": {},
          "grid": {
            "bottom": "15%",
            "left": "10%",
            "right": "5%",
            "show": false,
            "top": "20%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "icon": "circle",
            "itemGap": 15,
            "left": "55%",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9AABBD"
            },
            "right": "5%",
            "show": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#485465",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": "5%",
            "type": "plain"
          },
          "options": {},
          "series": {
            "areaStyle": {
              "opacity": 0
            }
          },
          "textStyle": {
            "bottom": "10%",
            "color": "#9AABBD",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "top": "10%"
          },
          "title": {
            "left": 10,
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "target": "blank",
            "textStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": 10
          },
          "tooltip": {
            "alwaysShowContent": false,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#9AABBD",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "trigger": "item",
            "triggerOn": "mousemove|click"
          },
          "xAxis": {
            "axisLabel": {},
            "axisTick": {
              "show": false
            },
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "show": true,
            "type": "category"
          },
          "yAxis": {
            "axisLabel": {},
            "nameGap": 15,
            "nameLocation": "end",
            "position": "left",
            "show": true,
            "splitLine": {
              "lineStyle": {
                "color": [
                  "#485465"
                ]
              },
              "show": true
            },
            "type": "value"
          }
        },
        "type": "61aa27abd39bdf74f6d600b8",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 280,
          "index": 17,
          "left": 494.75177304964546,
          "name": "雷达图",
          "top": 782.7423167848701,
          "visible": true,
          "width": 450
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"indicator\": [\n        {\n            \"name\": \"一\",\n            \"max\": 6500\n        },\n        {\n            \"name\": \"二\",\n            \"max\": 16000\n        },\n        {\n            \"name\": \"三\",\n            \"max\": 30000\n        },\n        {\n            \"name\": \"四\",\n            \"max\": 38000\n        },\n        {\n            \"name\": \"五\",\n            \"max\": 52000\n        },\n        {\n            \"name\": \"六\",\n            \"max\": 25000\n        }\n    ],\n    \"data\": [\n        {\n            \"data\": [\n                4200,\n                3000,\n                20000,\n                35000,\n                50000,\n                18000\n            ],\n            \"name\": \"北京\"\n        },\n        {\n            \"data\": [\n                5000,\n                14000,\n                28000,\n                26000,\n                42000,\n                21000\n            ],\n            \"name\": \"河北\"\n        },\n        {\n            \"data\": [\n                3000,\n                12000,\n                20000,\n                16000,\n                32000,\n                20000\n            ],\n            \"name\": \"天津\"\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "64KE-7NE1-FMHK-CUR8-CMJK-MLUN",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            "#FF2366",
            "#3891FF",
            "#1FDFE9"
          ],
          "functions": {},
          "grid": {
            "bottom": "10%",
            "left": "10%",
            "right": "10%",
            "show": false,
            "top": "10%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "align": "left",
            "bottom": " ",
            "icon": "rect",
            "itemGap": 15,
            "itemHeight": 10,
            "itemWidth": 10,
            "left": "center",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9aabbd"
            },
            "show": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": "90%",
            "type": "plain"
          },
          "options": {},
          "radar": {
            "axisLabel": {
              "color": "#485465",
              "fontSize": 12,
              "inside": false,
              "show": false
            },
            "axisLine": {
              "lineStyle": {
                "color": "#485465"
              },
              "onZero": true,
              "show": true,
              "symbolSize": [
                10,
                15
              ]
            },
            "axisName": {
              "color": "#485465",
              "fontSize": 10
            },
            "center": [
              225,
              123
            ],
            "radius": [
              0,
              90
            ],
            "splitArea": {
              "areaStyle": {
                "color": "#e12222",
                "opacity": 0
              }
            },
            "splitLine": {
              "lineStyle": {
                "color": "#485465"
              }
            },
            "splitNumber": 1
          },
          "series": {
            "北京": {
              "areaStyle": {
                "opacity": 0.3
              }
            },
            "天津": {
              "areaStyle": {
                "opacity": 0.3
              }
            },
            "河北": {
              "areaStyle": {
                "opacity": 0.3
              }
            }
          },
          "textStyle": {
            "bottom": "10%",
            "color": "#9aabbd",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "top": "10%"
          },
          "title": {
            "left": 10,
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "target": "blank",
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "top": 10
          },
          "tooltip": {
            "alwaysShowContent": false,
            "confine": true,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "showDelay": 0,
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "top": "10%"
            },
            "trigger": "item",
            "triggerOn": "mousemove|click"
          }
        },
        "type": "61aa27abd39bdf74f6d60103",
        "version": "v1.0.0"
      },
      {
        "config": {
          "class": "",
          "height": 240,
          "index": 0,
          "left": 1561.8536170212767,
          "name": "圆环进度组件",
          "top": 144.00731914893618,
          "visible": true,
          "width": 274
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "75"
          },
          "type": "json"
        },
        "id": "0QDK-H291-FMHO-A9DS-MQPT-BIU4",
        "options": {
          "barWidth": "15",
          "bgColor": "#0A0F1C",
          "clockwise": false,
          "color": "[{\n    \"maxValue\": 100,\n    \"minValue\": 0,\n    \"color\": {\n        \"type\": \"linear\",\n        \"x\": 0,\n        \"y\": 0,\n        \"x2\": 0,\n        \"y2\": 1,\n        \"colorStops\": [\n            {\n                \"offset\": 0,\n                \"color\": \"#0B78E3\"\n            },\n            {\n                \"offset\": 0.8,\n                \"color\": \"#6BD2F9\"\n            },\n            {\n                \"offset\": 1,\n                \"color\": \"#76DDFB\"\n            }\n        ],\n        \"globalCoord\": false\n    }\n}]",
          "image": "/lcapWeb/www/",
          "radius": "160%",
          "roundCap": true,
          "startAngle": "0"
        },
        "type": "61aa27abd39bdf74f6d60156",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 102,
          "index": 18,
          "left": 1488,
          "name": "标题",
          "top": 213,
          "visible": true,
          "width": 418
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": {\n        \"value\": \"75%\",\n        \"name\": \"公安数据\"\n    }\n}"
          },
          "type": "json"
        },
        "id": "836I-KK71-FMHO-RPBP-0GB0-UP9D",
        "options": {
          "alignItems": "center",
          "color": "#fff",
          "fontFamily": "inherit",
          "fontSize": 20,
          "fontWeight": 400,
          "hrefUrl": "",
          "image": "/lcapWeb/www/",
          "isLink": true,
          "isNewWindow": false,
          "justifyContent": "center",
          "style": ".ff-component-title { border: none; }",
          "text": "<div style=\"text-align: center; color: #3891FF\">${data.value}</div><div style=\"font-size: 16px; color: #485465\">${data.name}</div>"
        },
        "type": "61aa27abd39bdf74f6d600f0",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 280,
          "left": 1456.4890457114368,
          "name": "基础饼图",
          "top": 781.6741276595747,
          "visible": true,
          "width": 450
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"data\": [\n    {\n        \"value\": 500,\n        \"name\": \"MSIE\",\n        \"unit\": \"个\"\n    },\n    {\n        \"value\": 250,\n        \"name\": \"Firefox\",\n        \"unit\": \"个\"\n    },\n    {\n        \"value\": 90,\n        \"name\": \"Chrome\",\n        \"unit\": \"人\"\n    },\n    {\n        \"value\": 80,\n        \"name\": \"Safari\",\n        \"unit\": \"次\"\n    },\n    {\n        \"value\": 80,\n        \"name\": \"Opera\",\n        \"unit\": \"次\"\n    }\n]\n}"
          },
          "type": "json"
        },
        "id": "7RFB-TJF1-FMHP-3RV6-E1OA-9NDN",
        "options": {
          "color": [
            "#3891FF",
            "#58AFFF",
            "#1FDFE9",
            "#FACF14",
            "#E36D6F"
          ],
          "functions": {},
          "grid": {
            "bottom": "10%",
            "left": "10%",
            "right": "10%",
            "top": "10%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "left": "center",
            "orient": "horizontal",
            "textStyle": {
              "color": "#64768E",
              "fontSize": 12
            },
            "top": "bottom"
          },
          "options": {},
          "series": {
            "center": [
              "50%",
              "50%"
            ],
            "label": {
              "color": "#fff",
              "fontSize": 12,
              "formatter": "function anonymous(e\n) {\n  return (e.name || \"\") + \": \" + (e.percent || 0) + \"%\";\n}"
            },
            "radius": [
              "0",
              "70%"
            ]
          },
          "title": {},
          "tooltip": {
            "alwaysShowContent": false,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "trigger": "item",
            "triggerOn": "mousemove|click"
          },
          "xAxis": {
            "axisLabel": {},
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "show": false,
            "type": "category"
          },
          "yAxis": {
            "axisLabel": {},
            "nameGap": 15,
            "nameLocation": "end",
            "position": "left",
            "show": false,
            "type": "value"
          }
        },
        "type": "61aa27abd39bdf74f6d60100",
        "version": "v1.0.0"
      },
      {
        "config": {
          "height": 232,
          "index": 14,
          "left": 1466.4897021276602,
          "name": "基础柱状图 复制",
          "top": 466.82621276595756,
          "visible": true,
          "width": 431
        },
        "connects": {},
        "dataSource": {
          "config": {
            "mapping": {}
          },
          "options": {
            "json": "{\n    \"xAxis\": [\n        \"北京\",\n        \"天津\",\n        \"上海\",\n        \"重庆\",\n        \"广东\",\n        \"河北\",\n        \"山东\"\n    ],\n    \"data\": [\n        {\n            \"name\": \"Max\",\n            \"data\": [\n               -70,\n                45,\n                -35,\n                65,\n                60,\n                40,\n                45\n            ]\n        }\n    ]\n}"
          },
          "type": "json"
        },
        "id": "BA4B-55L1-FMHQ-13AI-QLI1-49BF",
        "options": {
          "animation": true,
          "animationDelay": 0,
          "animationDelayUpdate": 0,
          "animationDuration": 1000,
          "animationDurationUpdate": 300,
          "animationEasing": "cubicOut",
          "animationEasingUpdate": "cubicInOut",
          "animationThreshold": 2000,
          "axisPointer": {
            "show": false,
            "triggerOn": "mousemove|click",
            "triggerTooltip": true,
            "type": "line"
          },
          "backgroundColor": "#13183000",
          "color": [
            {
              "angle": 90,
              "colorStops": [
                {
                  "active": false,
                  "color": "rgb(118, 221, 251)",
                  "id": 1,
                  "offset": 0,
                  "opacity": 1
                },
                {
                  "active": true,
                  "color": "rgb(11, 120, 227)",
                  "id": 2,
                  "offset": 1,
                  "opacity": 1
                }
              ],
              "type": "linear",
              "x": 0,
              "x2": 0,
              "y": 0,
              "y2": 1
            }
          ],
          "functions": {},
          "grid": {
            "bottom": "10%",
            "left": "10%",
            "right": "5%",
            "show": false,
            "top": "20%"
          },
          "image": "/lcapWeb/www/",
          "legend": {
            "height": "10",
            "itemHeight": 10,
            "itemStyle": {
              "borderRadius": 5000
            },
            "itemWidth": 10,
            "left": "85%",
            "orient": "horizontal",
            "pageIconColor": "#aaa",
            "pageIconInactiveColor": "#2f4554",
            "pageTextStyle": {
              "color": "#9aabbd"
            },
            "show": false,
            "textStyle": {
              "bottom": "10%",
              "color": "#64768E",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "top": "5%",
            "type": "plain",
            "width": "10"
          },
          "options": {},
          "series": {
            "barMaxWidth": 20
          },
          "textStyle": {
            "bottom": "10%",
            "color": "#9aabbd",
            "fontFamily": "sans-serif",
            "fontSize": 18,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "left": "10%",
            "lineHeight": 1.5,
            "right": "10%",
            "textAlign": "auto",
            "textVerticalAlign": "auto",
            "top": "10%"
          },
          "title": {
            "left": "74%",
            "show": true,
            "subtarget": "blank",
            "subtextStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "target": "blank",
            "text": "Temperature(℃)",
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 12,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "top": " 20"
          },
          "tooltip": {
            "alwaysShowContent": false,
            "confine": false,
            "enterable": false,
            "hideDelay": 100,
            "show": true,
            "showContent": true,
            "textStyle": {
              "bottom": "10%",
              "color": "#9aabbd",
              "fontFamily": "sans-serif",
              "fontSize": 18,
              "fontStyle": "normal",
              "fontWeight": "normal",
              "left": "10%",
              "lineHeight": 1.5,
              "right": "10%",
              "textAlign": "auto",
              "textVerticalAlign": "auto",
              "top": "10%"
            },
            "trigger": "item",
            "triggerOn": "mousemove|click"
          },
          "xAxis": {
            "axisLabel": {
              "inside": false,
              "show": true
            },
            "axisTick": {
              "show": false
            },
            "inverse": false,
            "nameGap": 15,
            "nameLocation": "end",
            "position": "bottom",
            "realtimeSort": false,
            "scale": false,
            "show": true,
            "splitLine": {
              "lineStyle": {
                "color": [
                  "#485465"
                ]
              },
              "show": true
            },
            "splitNumber": 5,
            "type": "value"
          },
          "yAxis": {
            "axisLabel": {
              "inside": false,
              "show": true
            },
            "inverse": false,
            "name": " ",
            "nameGap": " 20",
            "nameLocation": "end",
            "nameTextStyle": {
              "fontSize": 12,
              "textShadowOffsetX": -9
            },
            "position": "left",
            "realtimeSort": false,
            "scale": false,
            "show": true,
            "splitLine": {
              "show": false
            },
            "splitNumber": 5,
            "type": "category"
          }
        },
        "type": "61aa27abd39bdf74f6d600b7",
        "version": "v1.0.0"
      }
    ],
    "dataSources": [],
    "events": [],
    "functions": [],
    "id": "IE6D-9IC1-FMH3-NENR-DQ1N-6KAJ",
    "options": {
      "ENVGlobalOptions": {},
      "backgroundColor": "#0e1733",
      "backgroundImage": "/lcapWeb/www/applications/61b2bf5b5c43e5a52e507b52/77cd2a97-c0b8-4cc6-8d6f-ff720de244ec.png",
      "backgroundRepeat": false,
      "componentApiDomain": "",
      "css": ".ff-component-number-component-display > li > ul { padding: 0; }",
      "faviconIocImage": "",
      "height": 1080,
      "name": "数据可视化大屏幕",
      "scaleMode": "origin",
      "width": 1920
    }
  }
];
let allColor = [];

list.forEach(item => {
  item.components.forEach(component => {
    if (component.config.name === '趋势图') {
      component.options.color.forEach(color => {
        const colors = (color.colorStops || []).map(cs => cs.color);
        allColor = allColor.concat(colors);
      })
    }
  })
})

console.log('allColor', allColor)

// 帮我写个快速排序算法
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

const result = quickSort(allColor);
console.log('result', result)
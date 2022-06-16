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
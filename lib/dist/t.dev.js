"use strict"; // require("core-js/modules/es.promise.js");
// require("core-js/modules/es.promise.finally.js");
// var _ref;
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
// Promise.resolve().finally();
// console.log((_ref = null) !== null && _ref !== void 0 ? _ref : 5);

module.exports = {
  a: 1
};
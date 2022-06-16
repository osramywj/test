// // function decoratorFactory(name: string) {
// //   return (target: Function) => {
// //     target.prototype.say = () => {
// //       console.log(name + ' saying');
// //     }
// //   }
// // }
// // @decoratorFactory('yang')
// // class A {}
// // (new A() as any).say();
// // class A {
// //   @decorator
// //   say(){
// //     console.log('aaaa')
// //   }
// // }
// // function decorator (prop: any, name: string, descriptor: PropertyDescriptor){
// //   console.log('dddd');
// // }
// // new A().say();
// class A {
//   @d(5000)
//   say(){
//     console.log('aaa')
//   }
// }
// function d(time: number) {
//   return (p: any, name: string, descriptor: PropertyDescriptor) =>  {
//     const method = descriptor.value;
//     descriptor.value = () => {
//       setTimeout(() => {
//         method()
//       }, time);
//     };
//   }
// }
// // Object.defineProperty(A.prototype, 'say', {
// //   // value: () => {console.log('bbbb')},
// //   writable: false,
// // })
// new A().say();
// type Extract<T, U> = T extends U ? T : never;
// type I = Extract<string | number, string>; // 包含关系 输出 number;
// type Exclude<T, U> = T extends U ? never : T;
// type E = Exclude<string | number, string>; // 排除关系 输出 string;
// type NonNullable<T> = T extends null | undefined ? never : T;
// type N = NonNullable<string | number | null | undefined>;// 删除null和undifined;
// let a : I = '111';
// let b : E = 111;
// type Alias = { num: number }
// interface Interface {
//     num: number;
// }
// declare function aliased(arg: Alias): Alias;
// declare function interfaced(arg: Interface): Interface;
// interface Dictionary {
//   [key: string]: string;
// }
// let keys: keyof Dictionary; // string | number
// interface Car {
// manufacturer: string;
// model: string;
// year: number;
// }
// let carProps: keyof Car;
// type a = keyof Car;
// let carProps: keyof Car = {year: "year"}[keyof Car];
// export {};

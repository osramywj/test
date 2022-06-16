/**
 * 装饰器
 * target属性就是使用装饰器的那个类
// */
// function logClass(target: any) {
//   console.log(target);
//    target.prototype.apiUrl = 'http://www.baidu.com'
//    target.prototype.child = 'bbbb';
//    target.prototype.hello = () => {
//     console.log("hello world")
//    }
//  }
 
//  @logClass
//  class HttpClient {
//   public child: string = 'aaa';
//   constructor() { 

//   }
//  }
//  ​
//  const http: any = new HttpClient()
//  ​
//  console.log(http.apiUrl) // http://www.baidu.com
//  http.hello() //hello world
// console.log(http.child);
 
/**
 * 装饰器工厂
 * params就是我们要传递的参数
 * target就是要使用装饰器的那个类
 */
//  function logClass(params: string) {
//    return function (target: any) {
//      target.prototype.hello = () => {
//        console.log(params)
//      }
//    }
//  }
//  ​
//  @logClass('hello world')
//  class HttpClient {
//    constructor() { }
//  }
//  ​
//  const http: any = new HttpClient()
//  http.hello()  //打印hello world
 

// function logClass(target: any) {
//    return class extends target {
//      apiUrl: string = '修改后的apiUrl'
//      getData() {
//        console.log('修改:', this.apiUrl)
//      }
//    }
//  }
//  ​
//  @logClass
//  class HttpClient {
//    public apiUrl: string | undefined
//    constructor() {
//      this.apiUrl = '没修改前的apiUrl'
//    }
//  ​
//    getData() {
//      console.log(this.apiUrl)
//    }
//  }
//  ​
//  const http = new HttpClient()
//  http.getData() //修改: 修改后的apiUrl
 

/**
 * 属性装饰器
 * params就是装饰器传入的参数
 * target就是装饰的实例
 * attr就是装饰的属性
 */
//  function logProperty(params: any) {
//    return function (target: any, attr: string) {
//     console.log('target',target)
//     console.log('attr',attr)
//      //通过这样的方式就可以通过装饰器来修改属性值
//      target[attr] = params
//    }
//  }
//  ​
//  class HttpClient {
//    @logProperty('属性装饰器赋值')
//    public apiUrl: string | undefined
//    constructor() {
//    }
//  ​
//    getData() {
//      console.log(this.apiUrl)
//    }
//  }
//  ​
//  const http = new HttpClient()
//  http.getData() // 属性装饰器赋值
//  console.log(http.apiUrl)
 

/**
 * params 传递给装饰器的值
 * target 装饰器的实例
 * methodName 方法名称
 * descriptor 描述
 */

//  function get(params: any) {
//   console.log(params); // http://www.baidu.com
//   return function (
//     target: any,
//     methodName: string,
//     descriptor: PropertyDescriptor,
//   ) {
//     console.log(target);
//     console.log(methodName);
//     console.log(descriptor); //修改前保存原始传入的方法
//     const originalMethod = descriptor.value; //重写传入的方法
//     descriptor.value = function (...args: any[]) {
//       //执行原来的方法
//       originalMethod.apply(this, args);

//       args = args.map((val) => +val);
//       console.log(args);
//     };
//   };
// }
// class HttpClient {
//   constructor() {}
//   @get('http://www.baidu.com')
//   getApi() {}
// }
// const http: any = new HttpClient();
// http.getApi('123', '456', '789'); //打印[123, 456, 789]

// function logParams(param: any) {
//   return function (target: any, methodName: string, paramIndex: number) {
//     console.log(target); // httpClient实例
//     console.log(methodName); // getApi
//     console.log(paramIndex); // 0
//   };
// }
// class HttpClient {
//   constructor() {}
//   getApi(@logParams('id') id: number) {
//     console.log(id);
//   }
// }
// const http = new HttpClient();
// http.getApi(123456);
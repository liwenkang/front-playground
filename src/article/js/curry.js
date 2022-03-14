// 函数 柯里化
// const add = (a) => {
//   return (b) => {
//     return (c) => {
//       return a + b + c;
//     };
//   };
// };

// 参数长度固定
// const add = (a, b, c) => a + b + c;

// const curry = (fn) => {
//   const length = fn.length;
//   const helper = (...args) => {
//     if (args.length === length) {
//       return fn(...args);
//     } else {
//       return (...otherArgs) => helper(...args, ...otherArgs);
//     }
//   };
//   return helper;
// };

// const curryAdd = curry(add);

// console.log(curryAdd(1)(2)(3));
// console.log(curryAdd(1, 2)(3));
// console.log(curryAdd(1)(2, 3));
// console.log(curryAdd(1, 2, 3));

// 参数长度不固定

const add = (...args) => {
  return args.reduce((prev, curr) => prev + curr);
};

const curry = (fn) => {
  let params = [];
  return function helper(...args) {
    if (args.length) {
      // 还有参数,继续累计
      params = [...params, ...args];
      return helper;
    } else {
      let val = fn(...params);
      params = [];
      return val;
    }
  };
};

const curryAdd = curry(add);

console.log(curryAdd(1)(2)(3)() + 1);
console.log(curryAdd(1, 2)(3)());
console.log(curryAdd(1)(2, 3)());
console.log(curryAdd(1, 2, 3)());

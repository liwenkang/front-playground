// 计算斐波那契

// [0, 1]
// Fn = Fn-1+ Fn-2

// const fib = (n) => {
//   let i = 0,
//     x = 0n,
//     y = 1n;
//   for (; i < n; i++) {
//     y = x + y;
//     x = y - x;
//   }
//   return x;
// };

const fib = (n) => {
  let x = 0;
  let y = 1;
  for (let i = 0; i < n; i++) {
    var z = y;
    y = (x + y) % 1000000007;
    x = z;
  }
  console.log(x);
  return x;
};

fib(1000000000);

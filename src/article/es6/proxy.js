// 手写用 ES6proxy 如何实现 arr[-1] 的访问
const proxyArray = (arr) => {
  return new Proxy(arr, {
    get: (target, p) => {
      while (p < 0) {
        p = +p + target.length;
      }
      while (p >= target.length) {
        p = +p - target.length;
      }
      return target[p];
    },
  });
};
var a = proxyArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(a[1]); // 2
console.log(a[-1]); // 9
console.log(a[20]); // 9
console.log(a[-10]); // 9
console.log(a[-20]); // 8

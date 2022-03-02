```js
// 中序遍历 就是从小到大
const kthLargest = (root, k) => {
  const array = [];
  const dfs = (root) => {
    if (root.left) {
      dfs(root.left);
    }

    array.push(root.val);

    if (root.right) {
      dfs(root.right);
    }
  };
  dfs(root);
  return array[array.length - k];
};
```

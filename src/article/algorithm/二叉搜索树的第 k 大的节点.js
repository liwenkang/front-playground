// 输入: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// 输出: 4

var kthLargest = function (root, k) {
  const array = [];
  const dfs = (node) => {
    if (node.left) {
      dfs(node.left);
    }

    array.push(node.val);

    if (node.right) {
      dfs(node.right);
    }
  };

  dfs(root);
  console.log("array", array[array.length - k]);
};

const root = {
  val: 5,
  left: {
    val: 3,
    left: {
      val: 2,
      left: {
        val: 1,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
  right: {
    val: 6,
    left: null,
    right: null,
  },
};

kthLargest(root, 3);

const myKthLargest = (root, k) => {
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

console.log("结果", myKthLargest(root, 3));

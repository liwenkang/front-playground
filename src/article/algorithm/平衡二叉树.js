const tree1 = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
};

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
const tree2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: { val: 4, left: null, right: null },
      right: { val: 4, left: null, right: null },
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  },
  right: {
    val: 2,
    left: null,
    right: null,
  },
};

// 后续判断是否平衡
const postOrderIsBalanced = (root) => {
  // 默认 true
  let flag = true;

  const getMaxDepth = (root) => {
    if (!root) {
      return 0;
    }
    const leftMaxDepth = getMaxDepth(root.left);
    const rightMaxDepth = getMaxDepth(root.right);

    if (Math.abs(leftMaxDepth - rightMaxDepth) > 1) {
      flag = false;
    }
    return Math.max(leftMaxDepth, rightMaxDepth) + 1;
  };

  getMaxDepth(root);
  console.log("flag", flag);
  return flag;
};

// postOrderIsBalanced(tree1);

// (2)获取左右子树的深度
const myGetHeight = (tree) => {
  if (!tree) {
    return 0;
  } else {
    return Math.max(myGetHeight(tree.left), myGetHeight(tree.right)) + 1;
  }
};

const myInOrderIsBalanced = (root) => {
  // 如果某二叉树中任意节点的左右子树的深度相差不超过 1，那么它就是一棵平衡二叉树。
  // (1)任意节点意味着需要递归,并在递归过程中判断
  // (2)获取左右子树的深度
  // (3)递归过程中左右子树的深度相差不超过 1
  // (4)空的二叉树一定是平衡二叉树

  // (1)任意节点意味着需要递归,并在递归过程中判断
  const dfs = (tree) => {
    if (!tree) {
      return true;
    } else {
      return (
        Math.abs(myGetHeight(tree.left), myGetHeight(tree.right)) <= 1 &&
        myInOrderIsBalanced(tree.left) &&
        myInOrderIsBalanced(tree.right)
      );
    }
  };

  return dfs(root);
};

const myPostOrderIsBalanced = (root) => {
  let flag = true;

  const maxDepth = (tree) => {
    if (!tree) {
      return 0;
    }

    const leftMaxDepth = maxDepth(tree.left);
    const rightMaxDepth = maxDepth(tree.right);

    // 从下往上做比较
    if (Math.abs(leftMaxDepth - rightMaxDepth) > 1) {
      flag = false;
    }

    return Math.max(leftMaxDepth, rightMaxDepth) + 1;
  };

  maxDepth(root);
  console.log(flag);
};

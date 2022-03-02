function ListNode(val) {
  this.val = val;
  this.next = null;
}

function array2list(ary) {
  if (!ary || ary.length === 0) {
    return null;
  }

  let node;
  let head = { val: ary[0], next: null };
  let prevNode = head; // 直接修改 prevNode => 间接修改 head

  for (let i = 1; i < ary.length; i++) {
    node = { val: ary[i], next: null };
    prevNode.next = node; // 直接修改 prevNode => 间接修改 head
    prevNode = node; // 置为当前节点
  }

  return head;
}

// 输入: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// 输出: 4

function list2array(head) {
  const array = [];
  while (head) {
    array.push(head.val);
    head = head.next;
  }
  return array;
}

// head {val: 1, next: null}
// prevNode {val: 1, next: null}

array2list([1, 2, 3, 4, 5]);

const reverseList = (head) => {
  let result = null;
  while (head) {
    result = {
      val: head.val,
      next: result,
    };
    head = head.next;
  }
  return result;
};

const head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null,
        },
      },
    },
  },
};

const simpleHead = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null,
    },
  },
};
console.log(reverseList(head));

const reverse = (node) => {
  if (!node || !node.next) {
    return node;
  }
  let prev = null;

  while (node) {
    prev = {
      val: node.val,
      next: prev,
    };
    node = node.next;
  }
  return prev;
};

console.log("simpleHead", reverse(simpleHead));

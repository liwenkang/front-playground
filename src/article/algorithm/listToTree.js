const list = [
  { pid: null, id: 1, data: "1" },
  { pid: 1, id: 2, data: "2-1" },
  { pid: 1, id: 3, data: "2-2" },
  { pid: 2, id: 4, data: "3-1" },
  { pid: 3, id: 5, data: "3-2" },
  { pid: 4, id: 6, data: "4-1" },
];

const result = [
  {
    pid: null,
    id: 1,
    data: "1",
    children: [
      {
        pid: 1,
        id: 2,
        data: "2-1",
        children: [
          {
            pid: 2,
            id: 4,
            data: "3-1",
            children: [
              {
                pid: 4,
                id: 6,
                data: "4-1",
              },
            ],
          },
        ],
      },
      {
        pid: 1,
        id: 3,
        data: "2-2",
        children: [
          {
            pid: 3,
            id: 5,
            data: "3-2",
          },
        ],
      },
    ],
  },
];

function listToTree(
  list,
  pid = null,
  { idName = "id", pidName = "pid", childName = "children" } = {}
) {
  return list.reduce((root, item) => {
    // 遍历每一项，如果该项与当前 pid 匹配，则递归构建该项的子树
    if (item[pidName] === pid) {
      const children = listToTree(list, item[idName]);
      if (children.length) {
        item[childName] = children;
      }
      return [...root, item];
    }
    return root;
  }, []);
}

console.log("list", listToTree(list));

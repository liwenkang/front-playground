// 输入：[2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3

const findRepeatNumber = function (nums) {
  // 和 index 的元素做交换
  for (let i = 0; i < nums.length; i++) {
    // 如果 nums[i] 和 index 的值相同,则跳过
    if (nums[i] === i) {
      // 跳过
    } else {
      // 如果需要交换的索引位置已经存在相同值，直接结束，返回当前值
      if (nums[nums[i]] === nums[i]) {
        return nums[i];
      } else {
        // 如果需要交换的索引位置不存在相同值，则交换
        [nums[nums[i]], nums[i]] = [nums[i], nums[nums[i]]];
      }
    }
  }
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));

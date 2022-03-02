const findRepeatNumber = function (nums) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i])) {
      return map.get(nums[i]);
    } else {
      map.set(nums[i], nums[i]);
    }
    console.log("map", map);
  }
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));

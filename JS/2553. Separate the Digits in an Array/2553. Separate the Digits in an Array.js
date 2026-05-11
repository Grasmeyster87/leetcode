/**
 * @param {number[]} nums
 * @return {number[]}
 */
var separateDigits = function (nums) {
    return nums.join('').split('').map(Number);
};

let nums = [13, 25, 83, 77];
let nums1 = [7, 1, 3, 9];

console.log(separateDigits(nums));
console.log(separateDigits(nums1));

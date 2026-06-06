/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function(nums) {
    let leftSum = 0;
    let rightSum = nums.reduce((a, b) => a + b, 0);
    const ans = [];
    
    for (let i = 0; i < nums.length; i++) {
        rightSum -= nums[i];
        ans.push(Math.abs(leftSum - rightSum));
        leftSum += nums[i];
    }
    
    return ans;
};
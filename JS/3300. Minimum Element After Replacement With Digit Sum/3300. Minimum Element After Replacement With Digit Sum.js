/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function(nums) {
    let minValue = Infinity;
    let reduceValue = [];
    for (let num of nums) {
        let val1 = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        reduceValue.push(val1);
    }
    for (let num of reduceValue) {
        minValue = Math.min(minValue, num);
    }
    return minValue;
};

nums = [999,19,199]

console.log(minElement(nums))
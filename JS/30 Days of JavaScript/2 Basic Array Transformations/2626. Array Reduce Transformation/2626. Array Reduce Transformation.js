/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    let accum = init;
    for( num of nums) {
        accum = fn(accum, num);
    }
    return accum;
};

nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
console.log(reduce(nums, fn, init))
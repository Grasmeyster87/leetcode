/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function (nums) {
    let n = Math.max(...nums);

    // Перевірка довжини
    if (nums.length !== n + 1) return false;

    // Підрахунок частот
    let freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Перевірка чисел від 1 до n-1
    for (let i = 1; i < n; i++) {
        if (freq.get(i) !== 1) return false;
    }

    // Перевірка числа n
    return freq.get(n) === 2;
};

let nums = [1, 3, 3, 2];
let nums2 = [2, 1, 3];

console.log(isGood(nums));
console.log(isGood(nums2));

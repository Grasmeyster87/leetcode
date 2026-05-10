/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function(nums, target) {
    const n = nums.length;
    // dp[i] — максимальна кількість стрибків, щоб дістатися до індексу i
    const dp = new Array(n).fill(-1);
    dp[0] = 0; // стартова позиція — 0 стрибків

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            // Перевіряємо чи можна стрибнути з i на j
            if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }

    return dp[n - 1];
};

// Тести
console.log(maximumJumps([1,3,6,4,1,2], 2)); // 3
console.log(maximumJumps([1,3,6,4,1,2], 3)); // 5
console.log(maximumJumps([1,3,6,4,1,2], 0)); // -1
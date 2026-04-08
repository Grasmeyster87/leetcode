/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007;
    
    // 1. Проходимо по кожному запиту
    for (let i = 0; i < queries.length; i++) {
        const [l, r, k, v] = queries[i];
        
        // 2. Симулюємо множення для потрібних індексів
        for (let idx = l; idx <= r; idx += k) {
            // Множимо і беремо залишок від ділення
            nums[idx] = (nums[idx] * v) % MOD;
        }
    }
    
    // 3. Обчислюємо фінальний побітовий XOR
    let xorSum = 0;
    for (let i = 0; i < nums.length; i++) {
        xorSum ^= nums[i];
    }
    
    return xorSum;
};
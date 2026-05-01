/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function(nums) {
    const n = nums.length;
    let sum = 0;  // Сума всіх елементів
    let f = 0;    // F(0)

    // Обчислюємо F(0) та суму
    for (let i = 0; i < n; i++) {
        sum += nums[i];
        f += i * nums[i];
    }

    let max = f;

    // F(k) = F(k-1) + sum - n * nums[n - k]
    // При ротації кожен елемент отримує індекс +1 (додаємо sum),
    // але елемент який був на позиції n-1 переходить на 0
    // і втрачає множник n (віднімаємо n * nums[n - k])
    for (let k = 1; k < n; k++) {
        f = f + sum - n * nums[n - k];
        max = Math.max(max, f);
    }

    return max;
};
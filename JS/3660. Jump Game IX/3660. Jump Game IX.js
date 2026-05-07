/**
 * @param {number[]} nums
 * @return {number[]}
 */
var maxValue = function(nums) {
    const n = nums.length;
    if (n === 1) return [nums[0]];

    // prefixMax[i] = max(nums[0..i])
    const prefixMax = new Array(n);
    prefixMax[0] = nums[0];
    for (let i = 1; i < n; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
    }

    // suffixMin[i] = min(nums[i..n-1])
    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
    }

    // Визначаємо суміжні інтервали (зв'язні компоненти).
    // Позиції i та i+1 в одній компоненті, якщо prefixMax[i] > suffixMin[i+1]
    // (існує інверсійна пара, що перекриває цю межу).
    const ans = new Array(n);
    let start = 0;

    for (let i = 0; i < n; i++) {
        // Перевіряємо, чи i — кінець поточної компоненти
        if (i === n - 1 || prefixMax[i] <= suffixMin[i + 1]) {
            // Компонента [start..i]: знаходимо максимум
            // prefixMax[i] вже містить max(nums[start..i]) якщо start=0,
            // але нам потрібен max саме для цього інтервалу
            let maxVal = nums[start];
            for (let j = start + 1; j <= i; j++) {
                if (nums[j] > maxVal) maxVal = nums[j];
            }
            for (let j = start; j <= i; j++) {
                ans[j] = maxVal;
            }
            start = i + 1;
        }
    }

    return ans;
};

// Тести
console.log(maxValue([2, 1, 3])); // [2, 2, 3]
console.log(maxValue([2, 3, 1])); // [3, 3, 3]
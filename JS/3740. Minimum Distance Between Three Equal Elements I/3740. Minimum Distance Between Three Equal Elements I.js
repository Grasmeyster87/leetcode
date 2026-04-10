/**
 * @param {number[]} nums
 * @return {number}
 */
function minimumDistance(nums) {
    const map = new Map();

    // 1. Збираємо індекси
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i]).push(i);
    }

    let result = Infinity;

    // 2. Обробка кожного значення
    for (const indices of map.values()) {
        if (indices.length < 3) continue;

        // 3. Беремо трійки підряд
        for (let i = 0; i <= indices.length - 3; i++) {
            const left = indices[i];
            const right = indices[i + 2];

            const distance = 2 * (right - left);
            result = Math.min(result, distance);
        }
    }

    return result === Infinity ? -1 : result;
}
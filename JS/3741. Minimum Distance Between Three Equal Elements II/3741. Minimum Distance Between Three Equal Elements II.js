/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function(nums) {
    const indicesMap = new Map();
    let minDistance = Infinity;

    // Ггрупуємо індекси для кожного числа
    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (!indicesMap.has(val)) {
            indicesMap.set(val, []);
        }
        indicesMap.get(val).push(i);
    }

    // Шукаємо мінімальну відстань серед трійок сусідніх індексів
    for (const indices of indicesMap.values()) {
        if (indices.length < 3) continue;

        for (let p = 2; p < indices.length; p++) {
            // Формула 2 * (k - i) для відсортованих i < j < k
            const currentDist = 2 * (indices[p] - indices[p - 2]);
            if (currentDist < minDistance) {
                minDistance = currentDist;
            }
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};
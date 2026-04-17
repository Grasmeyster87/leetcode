/**
 * @param {number[]} nums
 * @return {number}
 */
var minMirrorPairDistance = function (nums) {
    const seenReversed = new Map();
    let minDistance = Infinity;

    for (let j = 0; j < nums.length; j++) {
        const num = nums[j];

        // 1. Проверяем, может ли текущее число образовать зеркальную пару
        // с каким-либо из предыдущих чисел
        if (seenReversed.has(num)) {
            const i = seenReversed.get(num);
            const distance = j - i;
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        // 2. Переворачиваем текущее число математическим путем (это быстрее, чем через строки)
        let n = num;
        let rev = 0;
        while (n > 0) {
            rev = rev * 10 + (n % 10);
            n = Math.floor(n / 10);
        }

        // Сохраняем или обновляем индекс перевернутого числа.
        // Перезапись гарантирует, что мы храним самый свежий индекс,
        // минимизируя расстояние для будущих совпадений.
        seenReversed.set(rev, j);
    }

    return minDistance === Infinity ? -1 : minDistance;
};

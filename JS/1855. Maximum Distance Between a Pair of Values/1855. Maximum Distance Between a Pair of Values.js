/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDistance = function (nums1, nums2) {
    let i = 0;
    let j = 0;
    let maxDist = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            maxDist = Math.max(maxDist, j - i);
            j++;
        } else {
            i++;
        }
    }

    return maxDist;
};


var maxDistance = function(nums1, nums2) {
    let i = 0; // Вказівник для першого масиву (nums1)
    let j = 0; // Вказівник для другого масиву (nums2)
    let maxDist = 0; // Змінна для зберігання максимальної знайденої відстані

    // Цикл триває, поки обидва вказівники знаходяться в межах своїх масивів
    while (i < nums1.length && j < nums2.length) {
        // Перевіряємо умову допустимої пари: nums1[i] <= nums2[j]
        if (nums1[i] <= nums2[j]) {
            // Оновлюємо максимальну відстань (j - i), якщо поточна більша за попередню
            maxDist = Math.max(maxDist, j - i);
            // Оскільки масиви не зростають, збільшуємо j, щоб спробувати знайти більшу відстань
            j++;
        } else {
            // Якщо nums1[i] > nums2[j], пара недійсна, тому зміщуємо i вперед
            i++;
        }
    }

    // Повертаємо підсумковий результат
    return maxDist;
};

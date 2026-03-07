/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = {}; // store number -> index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.hasOwnProperty(complement)) {
            return [map[complement], i];
        }
        map[nums[i]] = i;
    }
};

/*
var twoSum = function(nums, target) {
    const map = {}; // створюємо порожній об’єкт для збереження чисел та їх індексів
    for (let i = 0; i < nums.length; i++) { // проходимо по всіх елементах масиву
        const complement = target - nums[i]; // обчислюємо число, яке потрібно знайти (доповнення)
        if (map.hasOwnProperty(complement)) { // перевіряємо, чи це число вже є в map
            return [map[complement], i]; // якщо так, повертаємо індекси: збережений та поточний
        }
        map[nums[i]] = i; // якщо ні, додаємо поточне число в map з його індексом
    }
};
*/

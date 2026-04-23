/**
 * @param {number[]} nums
 * @return {number[]}
 */

var distance = function(nums) {
    // Ініціалізуємо результуючий масив нулями
    const res = new Array(nums.length).fill(0);
    // Map для зберігання індексів кожного унікального числа
    const map = new Map();

    // 1. Групуємо індекси за значеннями елементів
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i]).push(i);
    }

    // 2. Обчислюємо відстані для кожної групи однакових елементів
    for (const indices of map.values()) {
        const n = indices.length;
        
        // Якщо елемент зустрічається лише раз, сума відстаней залишається 0
        if (n === 1) continue;

        // Знаходимо загальну суму всіх індексів для даного числа
        let totalSum = 0;
        for (let i = 0; i < n; i++) {
            totalSum += indices[i];
        }

        let leftSum = 0;
        let rightSum = totalSum;

        // Проходимо по кожному індексу в групі
        for (let p = 0; p < n; p++) {
            const index = indices[p];
            
            // Віднімаємо поточний індекс від суми елементів праворуч
            rightSum -= index;

            // Обчислюємо суму відстаней для елементів зліва
            // Формула: (кількість елементів зліва * поточний індекс) - сума їх індексів
            const leftPart = p * index - leftSum;

            // Обчислюємо суму відстаней для елементів справа
            // Формула: сума їх індексів - (кількість елементів справа * поточний індекс)
            const rightPart = rightSum - (n - 1 - p) * index;

            // Записуємо результат
            res[index] = leftPart + rightPart;

            // Додаємо поточний індекс до суми елементів зліва для наступної ітерації
            leftSum += index;
        }
    }

    return res;
};
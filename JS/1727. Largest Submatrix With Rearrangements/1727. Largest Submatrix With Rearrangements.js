/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // Для кожного рядка обчислюємо висоту стовпчика з одиниць
    // Якщо matrix[i][j] == 1, то height[i][j] = height[i-1][j] + 1
    // Якщо matrix[i][j] == 0, то height[i][j] = 0
    const height = Array(m).fill().map(() => Array(n).fill(0));
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                height[i][j] = i === 0 ? 1 : height[i - 1][j] + 1;
            } else {
                height[i][j] = 0;
            }
        }
    }
    
    let maxArea = 0;
    
    // Для кожного рядка сортуємо висоти у спадаючому порядку
    // Щоб максимально ефективно використовувати стовпці
    for (let i = 0; i < m; i++) {
        // Сортуємо висоти у спадаючому порядку
        height[i].sort((a, b) => b - a);
        
        // Обчислюємо максимальну площу для цього рядка
        for (let j = 0; j < n; j++) {
            // Ширина підматриці = j + 1
            // Висота = height[i][j]
            // Площа = висота * ширина
            const area = height[i][j] * (j + 1);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    return maxArea;
};

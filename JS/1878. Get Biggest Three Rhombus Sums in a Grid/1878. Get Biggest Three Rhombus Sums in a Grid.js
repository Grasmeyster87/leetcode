/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const sums = new Set();

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            // Кожна окрема клітинка — це ромб площею 0
            sums.add(grid[r][c]);

            // Пробуємо будувати ромби більшого розміру (s > 0)
            // s — це відстань від верхньої точки до бокових
            for (let s = 1; r + 2 * s < m && c - s >= 0 && c + s < n; s++) {
                let currentSum = 0;

                // Проходимо по 4 сторонах ромба
                // Від верхньої точки до правої і вниз до нижньої, потім вліво і вгору
                for (let i = 0; i < s; i++) {
                    currentSum += grid[r + i][c + i];         // Верх → Право
                    currentSum += grid[r + s + i][c + s - i]; // Право → Низ
                    currentSum += grid[r + 2 * s - i][c - i]; // Низ → Ліво
                    currentSum += grid[r + s - i][c - s + i]; // Ліво → Верх
                }
                
                sums.add(currentSum);
            }
        }
    }

    // Перетворюємо Set у масив, сортуємо за спаданням і беремо топ-3
    return Array.from(sums)
        .sort((a, b) => b - a)
        .slice(0, 3);
};
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var rotateGrid = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        const top = layer, bottom = m - 1 - layer;
        const left = layer, right = n - 1 - layer;

        // Витягуємо елементи шару за годинниковою стрілкою
        const ring = [];

        // Верхній рядок: зліва направо
        for (let j = left; j <= right; j++) ring.push(grid[top][j]);
        // Правий стовпець: зверху вниз (без верхнього кута)
        for (let i = top + 1; i <= bottom; i++) ring.push(grid[i][right]);
        // Нижній рядок: справа наліво (без правого кута)
        for (let j = right - 1; j >= left; j--) ring.push(grid[bottom][j]);
        // Лівий стовпець: знизу вгору (без кутів)
        for (let i = bottom - 1; i > top; i--) ring.push(grid[i][left]);

        const len = ring.length;
        const shift = k % len; // Зсув проти годинникової стрілки

        // Записуємо зсунуті елементи назад у матрицю
        let idx = 0;

        for (let j = left; j <= right; j++) grid[top][j] = ring[(idx++ + shift) % len];
        for (let i = top + 1; i <= bottom; i++) grid[i][right] = ring[(idx++ + shift) % len];
        for (let j = right - 1; j >= left; j--) grid[bottom][j] = ring[(idx++ + shift) % len];
        for (let i = bottom - 1; i > top; i--) grid[i][left] = ring[(idx++ + shift) % len];
    }

    return grid;
};
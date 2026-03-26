/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    let totalSum = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            totalSum += grid[i][j];
        }
    }

    // Якщо сума непарна, рівний поділ неможливий
    if (totalSum % 2 !== 0) return false;
    const target = totalSum / 2;

    // 1. Перевірка горизонтального розрізу
    let rowAccumulator = 0;
    for (let i = 0; i < m - 1; i++) { // m - 1, щоб не залишати порожню секцію
        for (let j = 0; j < n; j++) {
            rowAccumulator += grid[i][j];
        }
        if (rowAccumulator === target) return true;
    }

    // 2. Перевірка вертикального розрізу
    let colAccumulator = 0;
    for (let j = 0; j < n - 1; j++) { // n - 1, щоб не залишати порожню секцію
        for (let i = 0; i < m; i++) {
            colAccumulator += grid[i][j];
        }
        if (colAccumulator === target) return true;
    }

    return false;
};
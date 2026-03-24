/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const MOD = 12345;
    
    // Ініціалізуємо матрицю результату
    let p = Array.from({ length: n }, () => new Array(m).fill(0));
    let runningProduct = 1;

    // 1. Прямий хід: обчислюємо префіксні добутки
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            p[i][j] = runningProduct;
            runningProduct = (runningProduct * (grid[i][j] % MOD)) % MOD;
        }
    }

    runningProduct = 1;

    // 2. Зворотний хід: множимо на суфіксні добутки
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            p[i][j] = (p[i][j] * runningProduct) % MOD;
            runningProduct = (runningProduct * (grid[i][j] % MOD)) % MOD;
        }
    }

    return p;
};
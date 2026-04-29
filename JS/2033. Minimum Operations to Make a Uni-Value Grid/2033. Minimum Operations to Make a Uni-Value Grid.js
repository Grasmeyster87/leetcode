/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    const MAX = 10001;
    const freq = new Int32Array(MAX);
    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;
    const remainder = grid[0][0] % x;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const val = grid[i][j];
            if (val % x !== remainder) return -1;
            freq[val]++;
        }
    }

    // Знаходимо медіану через counting sort
    const medianPos = (total >> 1) + 1;
    let count = 0;
    let median = 0;
    for (let v = 0; v < MAX; v++) {
        count += freq[v];
        if (count >= medianPos) {
            median = v;
            break;
        }
    }

    // Рахуємо операції
    let ops = 0;
    for (let v = 0; v < MAX; v++) {
        if (freq[v] > 0) {
            ops += freq[v] * (Math.abs(v - median) / x);
        }
    }

    return ops;
};
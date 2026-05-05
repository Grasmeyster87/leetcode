/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;

    // Крок 1: транспонування (міняємо matrix[i][j] ↔ matrix[j][i])
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Крок 2: реверс кожного рядка 
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};
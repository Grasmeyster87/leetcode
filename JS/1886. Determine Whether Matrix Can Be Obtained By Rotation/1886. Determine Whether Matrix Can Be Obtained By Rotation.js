/**
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
 */
var findRotation = function(mat, target) {
    // Проверяем 4 возможных поворота (0, 90, 180, 270 градусов)
    for (let i = 0; i < 4; i++) {
        if (isEqual(mat, target)) {
            return true;
        }
        mat = rotate90(mat);
    }
    
    return false;
};

// Вспомогательная функция для сравнения двух матриц
function isEqual(mat1, mat2) {
    const n = mat1.length;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (mat1[r][c] !== mat2[r][c]) {
                return false;
            }
        }
    }
    return true;
}

// Функция поворота матрицы на 90 градусов по часовой стрелке
function rotate90(matrix) {
    const n = matrix.length;
    // 1. Транспонируем матрицу (меняем строки и столбцы местами)
    // 2. Реверсируем каждую строку
    return matrix[0].map((_, colIndex) => 
        matrix.map(row => row[colIndex]).reverse()
    );
}
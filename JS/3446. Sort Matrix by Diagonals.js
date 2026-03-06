/*
3446. Sort Matrix by Diagonals

You are given an n x n square matrix of integers grid. Return the matrix such that:

    The diagonals in the bottom-left triangle (including the middle diagonal) are sorted in non-increasing order.
    The diagonals in the top-right triangle are sorted in non-decreasing order.

 

Example 1:

Input: grid = [[1,7,3],[9,8,2],[4,5,6]]

Output: [[8,2,3],[9,6,7],[4,5,1]]

Explanation:

The diagonals with a black arrow (bottom-left triangle) should be sorted in non-increasing order:

    [1, 8, 6] becomes [8, 6, 1].
    [9, 5] and [4] remain unchanged.

The diagonals with a blue arrow (top-right triangle) should be sorted in non-decreasing order:

    [7, 2] becomes [2, 7].
    [3] remains unchanged.

Example 2:

Input: grid = [[0,1],[1,2]]

Output: [[2,1],[1,0]]

Explanation:

The diagonals with a black arrow must be non-increasing, so [0, 2] is changed to [2, 0]. The other diagonals are already in the correct order.

Example 3:

Input: grid = [[1]]

Output: [[1]]

Explanation:

Diagonals with exactly one element are already in order, so no changes are needed.

 

Constraints:

    grid.length == grid[i].length == n
    1 <= n <= 10
    -105 <= grid[i][j] <= 105

//---------------------------
3446. Сортировка матрицы по диагоналям

Дана квадратная матрица размером n x n целых чисел grid. Верните матрицу таким образом, чтобы:

Диагонали в нижнем левом треугольнике (включая среднюю диагональ) были отсортированы по невозрастанию.
Диагонали в верхнем правом треугольнике были отсортированы по неубывающему значению.

Пример 1:

Входные данные: grid = [[1,7,3],[9,8,2],[4,5,6]]

Выходные данные: [[8,2,3],[9,6,7],[4,5,1]]

Пояснение:

Диагонали с чёрной стрелкой (нижний левый треугольник) должны быть отсортированы по невозрастанию:

[1, 8, 6] преобразуется в [8, 6, 1].
[9, 5] и [4] остаются без изменений.

Диагонали с синей стрелкой (верхний правый треугольник) следует отсортировать в порядке неубывания:

[7, 2] становится [2, 7].
[3] остаётся без изменений.

Пример 2:

Входные данные: grid = [[0, 1],[1, 2]]

Выходные данные: [[2, 1],[1, 0]]

Пояснение:

Диагонали с чёрной стрелкой должны быть невозрастающими, поэтому [0, 2] меняется на [2, 0]. Остальные диагонали уже расположены в правильном порядке.

Пример 3:

Входные данные: grid = [[1]]

Выходные данные: [[1]]

Пояснение:

Диагонали, содержащие ровно один элемент, уже упорядочены, поэтому никаких изменений не требуется.

Ограничения:

grid.length == grid[i].length == n
1 <= n <= 10
-105 <= grid[i][j] <= 105

*/

/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var sortMatrix = function (grid) {
    const n = grid.length;
    const diagonals = new Map();

    // Збір елементів по діагоналях
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            const key = i - j;
            if (!diagonals.has(key)) diagonals.set(key, []);
            diagonals.get(key).push(grid[i][j]);
        }
    }

    // Сортування діагоналей згідно з їх розташуванням
    for (let [key, arr] of diagonals.entries()) {
        if (key >= 0) {
            arr.sort((a, b) => b - a); // нижній лівий трикутник: невозрастання
        } else {
            arr.sort((a, b) => a - b); // верхній правий трикутник: неубування
        }
    }

    // Запис назад у матрицю
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            const key = i - j;
            grid[i][j] = diagonals.get(key).shift();
        }
    }

    return grid;
};


/* Testcase

grid1 = [[1,7,3],[9,8,2],[4,5,6]]
grid2 = [[0,1],[1,2]]
grid3 = [[1]]
*/
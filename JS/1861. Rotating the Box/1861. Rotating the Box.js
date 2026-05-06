/**
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
var rotateTheBox = function(boxGrid) {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    // Крок 1: Застосувати гравітацію — зсунути камені вправо у кожному рядку
    for (let i = 0; i < m; i++) {
        let empty = n - 1; // вказівник на найправішу доступну позицію
        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                // Перешкода — скидаємо вказівник
                empty = j - 1;
            } else if (boxGrid[i][j] === '#') {
                // Камінь — переміщуємо на вільну позицію
                boxGrid[i][j] = '.';
                boxGrid[i][empty] = '#';
                empty--;
            }
        }
    }

    // Крок 2: Поворот на 90° за годинниковою стрілкою
    // result[j][m - 1 - i] = boxGrid[i][j]
    const result = Array.from({ length: n }, () => new Array(m));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return result;
};
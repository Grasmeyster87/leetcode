/**
 * @param {character[][]} grid
 * @return {number}
 */
/*
var numberOfSubmatrices = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Створюємо префіксну суму для кількості X і Y у кожному рядку
    // prefixSum[i][j][0] - кількість 'X' від (0,0) до (i,j)
    // prefixSum[i][j][1] - кількість 'Y' від (0,0) до (i,j)
    const prefixSum = Array(rows)
        .fill()
        .map(() => 
            Array(cols)
                .fill()
                .map(() => [0, 0])
        );

    // Ініціалізуємо перший елемент
    if (grid[0][0] === 'X') {
        prefixSum[0][0][0] = 1;
    } else if (grid[0][0] === 'Y') {
        prefixSum[0][0][1] = 1;
    }

    // Обчислюємо префіксні суми для перших рядків
    for (let j = 1; j < cols; j++) {
        prefixSum[0][j][0] = prefixSum[0][j - 1][0];
        prefixSum[0][j][1] = prefixSum[0][j - 1][1];
        if (grid[0][j] === 'X') {
            prefixSum[0][j][0]++;
        } else if (grid[0][j] === 'Y') {
            prefixSum[0][j][1]++;
        }
    }

    // Обчислюємо префіксні суми для перших стовпців
    for (let i = 1; i < rows; i++) {
        prefixSum[i][0][0] = prefixSum[i - 1][0][0];
        prefixSum[i][0][1] = prefixSum[i - 1][0][1];
        if (grid[i][0] === 'X') {
            prefixSum[i][0][0]++;
        } else if (grid[i][0] === 'Y') {
            prefixSum[i][0][1]++;
        }
    }

    // Обчислюємо префіксні суми для решти клітинок
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            prefixSum[i][j][0] = prefixSum[i][j - 1][0] + prefixSum[i - 1][j][0] - prefixSum[i - 1][j - 1][0];
            prefixSum[i][j][1] = prefixSum[i][j - 1][1] + prefixSum[i - 1][j][1] - prefixSum[i - 1][j - 1][1];
            if (grid[i][j] === 'X') {
                prefixSum[i][j][0]++;
            } else if (grid[i][j] === 'Y') {
                prefixSum[i][j][1]++;
            }
        }
    }

    let count = 0;

    // Перевіряємо всі можливі підматриці, що містять (0,0)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Кількість X і Y у підматриці (0,0) до (i,j)
            const xCount = prefixSum[i][j][0];
            const yCount = prefixSum[i][j][1];

            // Перевіряємо умови:
            // 1. Рівна кількість X і Y
            // 2. Присутній хоча б один X
            if (xCount === yCount && xCount > 0) {
                count++;
            }
        }
    }

    return count;
};
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Зберігаємо поточну різницю (X-Y) та кількість X для кожного стовпця
    const diffs = new Int32Array(cols);
    const xCounts = new Int32Array(cols);
    
    let totalCount = 0;

    for (let i = 0; i < rows; i++) {
        let rowDiff = 0;
        let rowX = 0;
        
        for (let j = 0; j < cols; j++) {
            const char = grid[i][j];
            
            // Оновлюємо значення для поточного рядка
            if (char === 'X') {
                rowDiff++;
                rowX++;
            } else if (char === 'Y') {
                rowDiff--;
            }

            // Додаємо значення зверху (імітація 2D префіксної суми)
            diffs[j] += rowDiff;
            xCounts[j] += rowX;

            // Перевіряємо умови: X-Y == 0 та X > 0
            if (diffs[j] === 0 && xCounts[j] > 0) {
                totalCount++;
            }
        }
    }

    return totalCount;
};
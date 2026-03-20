/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Розмір вихідної матриці згідно з умовою
    const resRows = m - k + 1;
    const resCols = n - k + 1;
    const ans = Array.from({ length: resRows }, () => new Array(resCols).fill(0));

    for (let i = 0; i <= m - k; i++) {
        for (let j = 0; j <= n - k; j++) {
            // 1. Збираємо всі унікальні елементи поточної підматриці k x k
            const elements = new Set();
            for (let r = i; r < i + k; r++) {
                for (let c = j; c < j + k; c++) {
                    elements.add(grid[r][c]);
                }
            }

            // 2. Якщо унікальних елементів менше 2, різниця за умовою 0
            if (elements.size < 2) {
                ans[i][j] = 0;
                continue;
            }

            // 3. Перетворюємо Set у відсортований масив
            const sortedUnique = Array.from(elements).sort((a, b) => a - b);

            // 4. Знаходимо мінімальну різницю між сусідніми елементами
            let minDiff = Infinity;
            for (let p = 0; p < sortedUnique.length - 1; p++) {
                const diff = Math.abs(sortedUnique[p + 1] - sortedUnique[p]);
                if (diff < minDiff) {
                    minDiff = diff;
                }
                // Якщо знайшли 1, менше вже не буде (для цілих чисел), можна вийти раніше
                if (minDiff === 1) break;
            }

            ans[i][j] = minDiff;
        }
    }

    return ans;
};
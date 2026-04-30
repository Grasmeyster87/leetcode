/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var maxPathScore = function(grid, k) {
    const m = grid.length;                          // кількість рядків сітки
    const n = grid[0].length;                       // кількість стовпців сітки

    // dp[i][j][c] — максимальний score, досягнувши клітинки (i,j) з витраченою вартістю рівно c
    // Ініціалізуємо все значенням -1 (недосяжний стан)
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            new Array(k + 1).fill(-1)
        )
    );

    dp[0][0][0] = 0;                                // старт: клітинка (0,0), score=0, cost=0

    for (let i = 0; i < m; i++) {                   // перебираємо рядки зверху вниз
        for (let j = 0; j < n; j++) {               // перебираємо стовпці зліва направо
            for (let c = 0; c <= k; c++) {           // перебираємо всі можливі значення витраченої вартості
                if (dp[i][j][c] === -1) continue;    // пропускаємо недосяжні стани

                const curScore = dp[i][j][c];        // поточний score у стані (i, j, c)

                // Спроба піти вниз: (i, j) → (i+1, j)
                if (i + 1 < m) {
                    const val = grid[i + 1][j];      // значення наступної клітинки
                    const addScore = val;             // score = значення клітинки (0, 1 або 2)
                    const addCost = val > 0 ? 1 : 0; // cost = 1 якщо значення ненульове, інакше 0
                    const nc = c + addCost;           // нова загальна вартість
                    if (nc <= k) {                    // перевіряємо чи не перевищуємо ліміт k
                        dp[i + 1][j][nc] = Math.max(dp[i + 1][j][nc], curScore + addScore);
                    }
                }

                // Спроба піти вправо: (i, j) → (i, j+1)
                if (j + 1 < n) {
                    const val = grid[i][j + 1];      // значення наступної клітинки
                    const addScore = val;             // score = значення клітинки (0, 1 або 2)
                    const addCost = val > 0 ? 1 : 0; // cost = 1 якщо значення ненульове, інакше 0
                    const nc = c + addCost;           // нова загальна вартість
                    if (nc <= k) {                    // перевіряємо чи не перевищуємо ліміт k
                        dp[i][j + 1][nc] = Math.max(dp[i][j + 1][nc], curScore + addScore);
                    }
                }
            }
        }
    }

    // Шукаємо максимальний score серед усіх допустимих вартостей у кінцевій клітинці
    let ans = -1;
    for (let c = 0; c <= k; c++) {
        if (dp[m - 1][n - 1][c] !== -1) {
            ans = Math.max(ans, dp[m - 1][n - 1][c]);
        }
    }

    return ans;
};
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxProductPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const MOD = 1000000007n;

    // Створюємо дві DP таблиці для зберігання макс. та мін. значень
    const maxDP = Array.from({ length: m }, () => Array(n).fill(0n));
    const minDP = Array.from({ length: m }, () => Array(n).fill(0n));

    // Ініціалізація початкової точки
    maxDP[0][0] = minDP[0][0] = BigInt(grid[0][0]);

    // Заповнюємо перший стовпчик (можна прийти тільки зверху)
    for (let i = 1; i < m; i++) {
        maxDP[i][0] = minDP[i][0] = maxDP[i - 1][0] * BigInt(grid[i][0]);
    }

    // Заповнюємо перший рядок (можна прийти тільки зліва)
    for (let j = 1; j < n; j++) {
        maxDP[0][j] = minDP[0][j] = maxDP[0][j - 1] * BigInt(grid[0][j]);
    }

    // Заповнюємо решту таблиці
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const val = BigInt(grid[i][j]);
            
            // Варіанти добутку з клітинки зверху та зліва
            const options = [
                maxDP[i - 1][j] * val,
                minDP[i - 1][j] * val,
                maxDP[i][j - 1] * val,
                minDP[i][j - 1] * val
            ];

            // Знаходимо локальний макс та мін серед варіантів
            maxDP[i][j] = options.reduce((a, b) => (a > b ? a : b));
            minDP[i][j] = options.reduce((a, b) => (a < b ? a : b));
        }
    }

    const result = maxDP[m - 1][n - 1];

    // Якщо результат від'ємний — повертаємо -1, інакше результат по модулю
    return result < 0n ? -1 : Number(result % MOD);
};
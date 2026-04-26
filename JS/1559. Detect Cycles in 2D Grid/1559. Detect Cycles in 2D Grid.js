/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) return false;

    const m = grid.length;
    const n = grid[0].length;
    
    // Більш чистий спосіб ініціалізації двовимірного масиву
    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up

    function dfs(i, j, prevI, prevJ) {
        visited[i][j] = true;

        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;

            // Проверяем границы и збіг символів
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === grid[i][j]) {
                // Пропускаємо ячейку, з якої щойно прийшли
                if (ni === prevI && nj === prevJ) continue;

                // Якщо ми потрапили у вже відвідану ячейку, і це не наш "батько" — це цикл
                if (visited[ni][nj]) return true; 

                // Занурюємось далі
                if (dfs(ni, nj, i, j)) return true;
            }
        }

        // БЕЗ visited[i][j] = false!
        return false;
    }

    // Запускаємо DFS для кожної невідвіданої ячейки
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                if (dfs(i, j, -1, -1)) return true;
            }
        }
    }

    return false;
};
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
function hasValidPath(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Масив для відстеження відвіданих клітинок, щоб уникнути зациклення
    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    const connections = {
        1: [[0, 1], [0, -1]], 
        2: [[1, 0], [-1, 0]], 
        3: [[1, 0], [0, -1]], 
        4: [[1, 0], [0, 1]],  
        5: [[-1, 0], [0, -1]],
        6: [[-1, 0], [0, 1]]  
    };

    function dfs(r, c) {
        // Якщо ми досягли кінцевої точки - шлях знайдено
        if (r === m - 1 && c === n - 1) return true;
        
        visited[r][c] = true;

        for (const [dr, dc] of connections[grid[r][c]]) {
            const nr = r + dr;
            const nc = c + dc;

            // Якщо сусід валідний і ми там ще не були
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                const neighborType = grid[nr][nc];
                
                // Перевіряємо чи сусідня клітинка з'єднується з нашою поточною
                const canConnectBack = connections[neighborType].some(
                    ([ndr, ndc]) => ndr === -dr && ndc === -dc
                );

                // Якщо з'єднання є, йдемо далі в глибину
                if (canConnectBack) {
                    if (dfs(nr, nc)) return true;
                }
            }
        }
        
        return false;
    }

    return dfs(0, 0);
}
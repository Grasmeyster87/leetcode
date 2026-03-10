/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1e9 + 7;

    // dp[i][j][last][count] – кількість способів побудувати масив
    // з i нулями та j одиницями, де останній елемент = last,
    // і count – скільки разів поспіль він повторюється.
    let dp = Array.from({length: zero+1}, () =>
        Array.from({length: one+1}, () =>
            [Array(limit+1).fill(0), Array(limit+1).fill(0)]
        )
    );

    // Початкові стани: можемо почати з одного нуля або однієї одиниці
    if (zero > 0) dp[1][0][0][1] = 1;
    if (one > 0) dp[0][1][1][1] = 1;

    for (let i = 0; i <= zero; i++) {
        for (let j = 0; j <= one; j++) {
            for (let last = 0; last <= 1; last++) {
                for (let c = 1; c <= limit; c++) {
                    let val = dp[i][j][last][c];
                    if (!val) continue;

                    // Якщо останній був 0, можемо додати ще один 0
                    if (last === 0 && i < zero && c < limit) {
                        dp[i+1][j][0][c+1] = (dp[i+1][j][0][c+1] + val) % MOD;
                    }
                    // Якщо останній був 0, можемо додати 1
                    if (last === 0 && j < one) {
                        dp[i][j+1][1][1] = (dp[i][j+1][1][1] + val) % MOD;
                    }
                    // Якщо останній був 1, можемо додати ще один 1
                    if (last === 1 && j < one && c < limit) {
                        dp[i][j+1][1][c+1] = (dp[i][j+1][1][c+1] + val) % MOD;
                    }
                    // Якщо останній був 1, можемо додати 0
                    if (last === 1 && i < zero) {
                        dp[i+1][j][0][1] = (dp[i+1][j][0][1] + val) % MOD;
                    }
                }
            }
        }
    }

    // Підрахунок усіх можливих варіантів
    let result = 0;
    for (let last = 0; last <= 1; last++) {
        for (let c = 1; c <= limit; c++) {
            result = (result + dp[zero][one][last][c]) % MOD;
        }
    }

    return result;

};
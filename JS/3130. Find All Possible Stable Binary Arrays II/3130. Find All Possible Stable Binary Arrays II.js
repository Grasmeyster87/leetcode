/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
var numberOfStableArrays = function (zero, one, limit) {
    const MOD = 1e9 + 7;

    // Створюємо двовимірні масиви для DP
    const dp0 = Array.from(
        { length: zero + 1 },
        () => new BigUint64Array(one + 1),
    );
    const dp1 = Array.from(
        { length: zero + 1 },
        () => new BigUint64Array(one + 1),
    );

    // Базові випадки: заповнюємо масиви, де є тільки 0 або тільки 1 (до межі limit)
    for (let i = 1; i <= Math.min(zero, limit); i++) dp0[i][0] = 1n;
    for (let j = 1; j <= Math.min(one, limit); j++) dp1[0][j] = 1n;

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            // Переходи для dp0 (закінчується на 0)
            // Включаємо всі комбінації попереднього кроку
            dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % BigInt(MOD);
            if (i > limit) {
                // Віднімаємо комбінації, що порушують ліміт (забагато нулів поспіль)
                dp0[i][j] =
                    (dp0[i][j] - dp1[i - limit - 1][j] + BigInt(MOD)) %
                    BigInt(MOD);
            }

            // Переходи для dp1 (закінчується на 1)
            dp1[i][j] = (dp0[i][j - 1] + dp1[i][j - 1]) % BigInt(MOD);
            if (j > limit) {
                // Віднімаємо комбінації, що порушують ліміт (забагато одиниць поспіль)
                dp1[i][j] =
                    (dp1[i][j] - dp0[i][j - limit - 1] + BigInt(MOD)) %
                    BigInt(MOD);
            }
        }
    }

    return Number((dp0[zero][one] + dp1[zero][one]) % BigInt(MOD));
};

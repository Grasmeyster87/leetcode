/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
var minimumTotalDistance = function(robot, factory) {
    // Сортуємо роботів та заводи за позицією
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const n = robot.length;
    const m = factory.length;

    // dp[j] — мінімальна відстань для перших j роботів
    // Використовуємо велике число для ініціалізації (Infinity)
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < m; i++) {
        const [pos, limit] = factory[i];
        // Йдемо з кінця в початок, щоб використовувати значення з попереднього заводу
        for (let j = n; j >= 1; j--) {
            let currDist = 0;
            // Спробуємо призначити k роботів (від 1 до limit) поточному заводу
            for (let k = 1; k <= limit && k <= j; k++) {
                currDist += Math.abs(robot[j - k] - pos);
                if (dp[j - k] !== Infinity) {
                    dp[j] = Math.min(dp[j], dp[j - k] + currDist);
                }
            }
        }
    }

    return dp[n];
};
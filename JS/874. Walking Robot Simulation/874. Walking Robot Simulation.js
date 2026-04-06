/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    // Зберігаємо перешкоди у вигляді множини (Set) для перевірки за O(1)
    const obstacleSet = new Set();
    for (const [x, y] of obstacles) {
        obstacleSet.add(`${x},${y}`);
    }

    // Напрямки: Північ (+Y), Схід (+X), Південь (-Y), Захід (-X)
    // Індекси:   0         1         2          3
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    let x = 0;
    let y = 0;
    let direction = 0; // Початковий напрямок - Північ (індекс 0)
    let maxDistSq = 0;

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];

        if (cmd === -2) {
            // Поворот ліворуч на 90 градусів
            direction = (direction + 3) % 4;
        } else if (cmd === -1) {
            // Поворот праворуч на 90 градусів
            direction = (direction + 1) % 4;
        } else {
            // Рух вперед на cmd кроків
            for (let step = 0; step < cmd; step++) {
                const nextX = x + dx[direction];
                const nextY = y + dy[direction];

                // Перевіряємо, чи немає попереду перешкоди
                if (obstacleSet.has(`${nextX},${nextY}`)) {
                    break; // Зупиняємось перед перешкодою, переходимо до наступної команди
                }

                // Робимо крок
                x = nextX;
                y = nextY;

                // Оновлюємо максимальне квадратичне відстань
                const currentDistSq = x * x + y * y;
                if (currentDistSq > maxDistSq) {
                    maxDistSq = currentDistSq;
                }
            }
        }
    }

    return maxDistSq;
};
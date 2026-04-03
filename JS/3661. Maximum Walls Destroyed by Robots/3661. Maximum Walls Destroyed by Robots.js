/**
 * @param {number[]} robots
 * @param {number[]} distance
 * @param {number[]} walls
 * @return {number}
 */
var maxWalls = function (robots, distance, walls) {
    const n = robots.length;

    // 1. Об'єднуємо роботів з їхніми дистанціями та сортуємо за позицією
    const sortedRobots = [];
    for (let i = 0; i < n; i++) {
        sortedRobots.push({ pos: robots[i], dist: distance[i] });
    }
    sortedRobots.sort((a, b) => a.pos - b.pos);

    // 2. Сортуємо стіни
    walls.sort((a, b) => a - b);

    // 3. Відокремлюємо стіни, які знаходяться ТОЧНО на позиціях роботів.
    // Такі стіни завжди гарантовано руйнуються незалежно від напрямку пострілу робота.
    const pureWalls = [];
    let wallsOnRobotsCount = 0;
    let rIdx = 0;

    for (let i = 0; i < walls.length; i++) {
        const w = walls[i];
        while (rIdx < n && sortedRobots[rIdx].pos < w) {
            rIdx++;
        }
        if (rIdx < n && sortedRobots[rIdx].pos === w) {
            wallsOnRobotsCount++;
        } else {
            pureWalls.push(w);
        }
    }

    // Допоміжні функції для бінарного пошуку
    function lowerBound(arr, L, R, val) {
        let low = L,
            high = R,
            ans = R + 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] >= val) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    function upperBound(arr, L, R, val) {
        let low = L,
            high = R,
            ans = L - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] <= val) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }

    let wIdx = 0;

    // 4. Обробка Інтервалу 0 (усі стіни зліва від першого робота)
    let l = wIdx;
    while (wIdx < pureWalls.length && pureWalls[wIdx] < sortedRobots[0].pos) {
        wIdx++;
    }
    let r = wIdx - 1;

    let dp0 = 0; // Максимальна кількість стін, якщо поточний робот стріляє вліво
    let dp1 = 0; // Максимальна кількість стін, якщо поточний робот стріляє вправо

    if (l <= r) {
        const limitL = sortedRobots[0].pos - sortedRobots[0].dist;
        const firstValid = lowerBound(pureWalls, l, r, limitL);
        dp0 = r - firstValid + 1;
    }

    // 5. Динамічне програмування для інтервалів між сусідніми роботами
    for (let i = 1; i < n; i++) {
        const rPrev = sortedRobots[i - 1];
        const rCurr = sortedRobots[i];

        l = wIdx;
        while (wIdx < pureWalls.length && pureWalls[wIdx] < rCurr.pos) {
            wIdx++;
        }
        r = wIdx - 1;

        const count = r - l + 1;
        let reachR = 0;
        let reachL = 0;
        let reachBoth = 0;

        if (count > 0) {
            // Скільки стін в цьому інтервалі знищить лівий робот, вистріливши вправо
            const limitR = rPrev.pos + rPrev.dist;
            const lastValid = upperBound(pureWalls, l, r, limitR);
            reachR = lastValid - l + 1;

            // Скільки стін в цьому інтервалі знищить правий робот, вистріливши вліво
            const limitL = rCurr.pos - rCurr.dist;
            const firstValid = lowerBound(pureWalls, l, r, limitL);
            reachL = r - firstValid + 1;

            // Якщо обидва стріляють назустріч одне одному:
            // Знищені стіни — це об'єднання їх зон ураження
            reachBoth = Math.min(count, reachR + reachL);
        }

        const nextDp0 = Math.max(dp0 + reachL, dp1 + reachBoth);
        const nextDp1 = Math.max(dp0, dp1 + reachR);

        dp0 = nextDp0;
        dp1 = nextDp1;
    }

    // 6. Обробка останнього інтервалу (усі стіни справа від останнього робота)
    l = wIdx;
    r = pureWalls.length - 1;
    let reachR = 0;

    if (l <= r) {
        const rLast = sortedRobots[n - 1];
        const limitR = rLast.pos + rLast.dist;
        const lastValid = upperBound(pureWalls, l, r, limitR);
        reachR = lastValid - l + 1;
    }

    const maxDestroyed = Math.max(dp0, dp1 + reachR);

    // 7. Загальна максимальна кількість — це результат ДП плюс стіни, які знаходилися на роботах
    return maxDestroyed + wallsOnRobotsCount;
};

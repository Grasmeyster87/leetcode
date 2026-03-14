/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */

var minNumberOfSeconds = function (mountainHeight, workerTimes) {
    // Функція для перевірки, чи можна зменшити висоту гори до 0 за заданий час
    function canFinish(time) {
        let totalHeight = 0;
        for (let t of workerTimes) {
            // k^2 + k - 2 * time / t <= 0
            // k = (-1 + sqrt(1 + 8 * time / t)) / 2
            let k = Math.floor((-1 + Math.sqrt(1 + (8 * time) / t)) / 2);
            totalHeight += k;
        }
        return totalHeight >= mountainHeight;
    }

    // Мінімальний можливий час
    let left = 1;
    // Максимальний можливий час - оцінка
    let maxTime = Math.max(...workerTimes);
    let right = ((mountainHeight * (mountainHeight + 1)) / 2) * maxTime;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (canFinish(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

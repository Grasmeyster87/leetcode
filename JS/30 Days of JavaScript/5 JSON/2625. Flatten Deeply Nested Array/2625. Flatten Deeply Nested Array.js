/**
 * @param {Array} arr
 * @param {number} n
 * @return {Array}
 */
var flat = function (arr, n) {
    const res = [];

    function helper(current, depth) {
        for (let i = 0; i < current.length; i++) {
            // Перевіряємо, чи це масив і чи не перевищено глибину
            if (depth < n && Array.isArray(current[i])) {
                helper(current[i], depth + 1);
            } else {
                res.push(current[i]);
            }
        }
    }

    helper(arr, 0);
    return res;
};
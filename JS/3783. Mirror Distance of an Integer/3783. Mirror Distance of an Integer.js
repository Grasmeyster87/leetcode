/**
 * @param {number} n
 * @return {number}
 */
var mirrorDistance = function (n) {
    let original = n; // сохраняем исходное число
    let reversed = 0;

    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n = Math.floor(n / 10);
    }

    return Math.abs(original - reversed);
};

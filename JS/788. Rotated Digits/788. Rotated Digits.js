/**
 * @param {number} n
 * @return {number}
 */
var rotatedDigits = function(n) {
    let count = 0;

    for (let i = 1; i <= n; i++) {
        let str = String(i);
        let valid = true;
        let different = false;

        for (let ch of str) {
            if (ch === '3' || ch === '4' || ch === '7') {
                valid = false;
                break;
            }
            if (ch === '2' || ch === '5' || ch === '6' || ch === '9') {
                different = true;
            }
        }

        if (valid && different) count++;
    }

    return count;
};
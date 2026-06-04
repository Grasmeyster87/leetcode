/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */

/*
var totalWaviness = function(num1, num2) {
    let total = 0;

    for (let n = num1; n <= num2; n++) {
        const digits = [];
        let tmp = n;

        while (tmp > 0) {
            digits.push(tmp % 10);
            tmp = Math.floor(tmp / 10);
        }

        digits.reverse();

        for (let i = 1; i < digits.length - 1; i++) {
            if (
                (digits[i] > digits[i - 1] && digits[i] > digits[i + 1]) ||
                (digits[i] < digits[i - 1] && digits[i] < digits[i + 1])
            ) {
                total++;
            }
        }
    }

    return total;
};
*/

/*
var totalWaviness = function(num1, num2) {
    let total = 0;
    const start = num1 < 100 ? 100 : num1;

    for (let n = start; n <= num2; n++) {
        const s = '' + n;
        const len = s.length;
        for (let i = 1; i < len - 1; i++) {
            const c = s.charCodeAt(i);
            if (
                (c > s.charCodeAt(i - 1) && c > s.charCodeAt(i + 1)) ||
                (c < s.charCodeAt(i - 1) && c < s.charCodeAt(i + 1))
            ) {
                total++;
            }
        }
    }

    return total;
};
*/

const P = new Int32Array(100001);
for (let n = 100; n <= 100000; n++) {
    const s = '' + n;
    let w = 0;
    for (let i = 1, e = s.length - 1; i < e; i++) {
        const c = s.charCodeAt(i);
        if (
            (c > s.charCodeAt(i - 1) && c > s.charCodeAt(i + 1)) ||
            (c < s.charCodeAt(i - 1) && c < s.charCodeAt(i + 1))
        ) {
            w++;
        }
    }
    P[n] = P[n - 1] + w;
}

var totalWaviness = function(num1, num2) {
    return P[num2] - P[num1 - 1];
};
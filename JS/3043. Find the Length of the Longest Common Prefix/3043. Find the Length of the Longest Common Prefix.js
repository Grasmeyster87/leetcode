/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function(arr1, arr2) {
    const prefixes = new Set();

    for (let i = 0; i < arr1.length; i++) {
        let n = arr1[i];
        while (n > 0) {
            if (prefixes.has(n)) break; // усі коротші префікси вже є
            prefixes.add(n);
            n = (n / 10) | 0;
        }
    }

    let res = 0;

    for (let i = 0; i < arr2.length; i++) {
        let n = arr2[i];
        while (n > 0) {
            if (prefixes.has(n)) {
                const len = n < 10 ? 1 : n < 100 ? 2 : n < 1000 ? 3
                    : n < 10000 ? 4 : n < 100000 ? 5 : n < 1000000 ? 6
                    : n < 10000000 ? 7 : n < 100000000 ? 8 : 9;
                if (len > res) res = len;
                break;
            }
            n = (n / 10) | 0;
        }
        if (res === 9) return 9; // максимум — далі шукати немає сенсу
    }

    return res;
};
/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    // Таблиця ваг по charCode — уникаємо віднімання 97 на кожному символі
    const wt = new Int32Array(123);
    for (let k = 0; k < 26; k++) wt[k + 97] = weights[k];

    const n = words.length;
    const codes = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        let sum = 0;
        const w = words[i];
        for (let j = 0; j < w.length; j++) sum += wt[w.charCodeAt(j)];
        codes[i] = 122 - sum % 26;
    }
    return String.fromCharCode.apply(null, codes);
};
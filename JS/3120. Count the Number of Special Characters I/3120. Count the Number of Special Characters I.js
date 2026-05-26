/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const set = new Set(word);
    let count = 0;
    
    for (let i = 97; i <= 122; i++) {
        const lower = String.fromCharCode(i);
        const upper = String.fromCharCode(i - 32);
        if (set.has(lower) && set.has(upper)) {
            count++;
        }
    }
    
    return count;
};  
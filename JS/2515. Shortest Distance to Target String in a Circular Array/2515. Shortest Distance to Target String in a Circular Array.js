/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closetTarget = function(words, target, startIndex) {
    const n = words.length;
    let answer = Infinity;

    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            const right = (i - startIndex + n) % n;
            const left = (startIndex - i + n) % n;
            
            answer = Math.min(answer, Math.min(left, right));
        }
    }

    return answer === Infinity ? -1 : answer;
};
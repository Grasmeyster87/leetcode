/**
 * @param {string} s
 * @return {string}
 */
var processStr = function(s) {
    let result = [];

    for (const c of s) {
        if (c === '*') {
            result.pop();
        } else if (c === '#') {
            result = result.concat(result);
        } else if (c === '%') {
            result.reverse();
        } else {
            result.push(c);
        }
    }

    return result.join('');
};
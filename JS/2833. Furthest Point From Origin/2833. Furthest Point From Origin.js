/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function (moves) {
    let countL = 0;
    let countR = 0;
    let count_ = 0;

    for (let char of moves) {
        if (char === 'L') {
            countL++;
        } else if (char === 'R') {
            countR++;
        } else {
            count_++;
        }
    }
    return Math.abs(countL - countR) + count_;
};

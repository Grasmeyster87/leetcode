/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function (n) {
    return parseInt(n
        .toString(2)
        .split('')
        .map((el) => {
            if (el == '1') {
                return '0';
            } else if (el == '0') {
                return '1';
            }
        })
        .join(''), 2)
};

console.log(bitwiseComplement(5));

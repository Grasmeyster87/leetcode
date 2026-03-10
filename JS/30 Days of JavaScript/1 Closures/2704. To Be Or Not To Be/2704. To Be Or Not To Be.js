/**
 * @param {string} val
 * @return {Object}
 */

var expect = function(val) {
    return {
        toBe: function(num) {
            if (val === num) {
                return true;
            } else {
                throw new Error("Not Equal");
            }
        },
        notToBe: function(num) {
            if (val !== num) {
                return true;
            } else {
                throw new Error("Equal");
            }
        }
    };
};

// Приклади:
console.log(expect(5).toBe(5));      // true
console.log(expect(5).notToBe(null)); // true
console.log(expect(5).notToBe(5));    // Error: Equal

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function(s, goal) {
    let resultBool = false;
    let value1 = new Array(...s);
    let value2 = new Array(...goal);

    for (let i = 0; i < value1.length; i++) {
        if (value1.toString() !== value2.toString()){
            let a1 = value1[0]
            value1.shift()
            value1.push(a1);
        } else {
            resultBool = true;
        }
    };
    return resultBool;
};

let s1 = "abcde";
let goal1 = "cdeab";

let s2 = "abcde";
let goal2 = "abced";

let result1 = rotateString(s1, goal1); // true
let result2 = rotateString(s2, goal2); // false
console.log(result1, result2)
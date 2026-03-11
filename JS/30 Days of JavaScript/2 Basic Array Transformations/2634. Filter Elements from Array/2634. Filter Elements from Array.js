/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
    let arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            // важно передавать и индекс!
            arrRes.push(arr[i]);
        }
    }
    return arrRes;
};

((arr = [0, 10, 20, 30]),
    (fn = function greaterThan10(n) {
        return n > 10;
    }));
console.log(filter(arr, fn));

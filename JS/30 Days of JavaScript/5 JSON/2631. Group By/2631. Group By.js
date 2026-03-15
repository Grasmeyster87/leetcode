/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    const result = {};
    for (const el of this) {
        const key = fn(el); // отримуємо ключ
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(el); // додаємо елемент у групу
    }
    return result;

};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
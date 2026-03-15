/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    let count = 0;
    let result = "";
    const chars = ['a', 'b', 'c'];

    function backtrack(currentString) {
        // Якщо ми вже знайшли k-й рядок, зупиняємо рекурсію
        if (result !== "") return;

        // Якщо довжина рядка досягла n
        if (currentString.length === n) {
            count++;
            if (count === k) {
                result = currentString;
            }
            return;
        }

        // Перебираємо символи 'a', 'b', 'c' у лексикографічному порядку
        for (let char of chars) {
            // Перевіряємо умову "щасливого" рядка: символ не має збігатися з попереднім
            if (currentString.length === 0 || currentString[currentString.length - 1] !== char) {
                backtrack(currentString + char);
            }
        }
    }

    backtrack("");
    return result;
};
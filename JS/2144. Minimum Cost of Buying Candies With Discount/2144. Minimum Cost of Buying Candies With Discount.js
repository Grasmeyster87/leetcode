/*
Оригінальний підхід з reduce:
const sorted = cost.slice().sort((a, b) => b - a);
  return sorted.reduce((sum, price, idx) => (idx % 3 === 2 ? sum : sum + price), 0);
*/

/*
 * Варіант 3: Абсолютний лідер швидкості на LeetCode (V8 Engine Hack)
 * Використання типізованих масивів (TypedArrays), таких як Uint8Array або Int32Array.
 * Вбудований метод .sort() для типізованих масивів сортує числа нативно в C++
 * без виклику JavaScript-функції зворотного виклику (a, b) => b - a.
 * Це уникає "перетинання" між JS та C++, роблячи сортування блискавичним (0ms).
 * Оскільки ціни <= 100, Uint8Array (від 0 до 255) ідеально підходить.
 */
var minimumCost = function (cost) {
    // 1. Копіюємо у типізований масив (швидка алокація)
    let arr = new Uint8Array(cost);
    
    // 2. Нативне сортування за зростанням (без callback, працює на рівні C++)
    arr.sort();
    
    let result = 0;
    
    // 3. Йдемо з кінця (від найбільших значень) з кроком 3
    for (let i = arr.length - 1; i >= 0; i -= 3) {
        result += arr[i];              // Беремо найдорожчу з трійки
        if (i > 0) result += arr[i - 1]; // Беремо другу за дорожнечею з трійки (якщо є)
    }
    
    return result;
};

// Варіант 1: Сортування підрахунком (O(N) алгоритмічно)
/*
var minimumCost = function (cost) {
    let counts = new Int32Array(101);
    for (let i = 0; i < cost.length; i++) {
        counts[cost[i]]++;
    }
    
    let result = 0;
    let takeCount = 0;
    
    for (let price = 100; price > 0; price--) {
        while (counts[price] > 0) {
            takeCount++;
            if (takeCount % 3 !== 0) {
                result += price;
            }
            counts[price]--;
        }
    }
    
    return result;
};
*/

// Варіант 2: Звичайний JS Array .sort() (O(N log N))
/*
 var minimumCost = function(cost) {
     cost.sort((a, b) => b - a);
     let result = 0;
     for (let i = 0; i < cost.length; i++) {
         if (i % 3 !== 2) {
             result += cost[i];
         }
     }
     return result;
 };
 */

let num1 = [6, 5, 7, 9, 2, 2];
console.log("Результат:", minimumCost(num1)); // 23
let num2 = [9, 7, 6, 5];
console.log("Результат (довжина 4):", minimumCost(num2)); // 21

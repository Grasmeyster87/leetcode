/*
You are given a 0-indexed integer array nums and an integer value.

In one operation, you can add or subtract value from any element of nums.

    For example, if nums = [1,2,3] and value = 2, you can choose to subtract value from nums[0] to make nums = [-1,2,3].

The MEX (minimum excluded) of an array is the smallest missing non-negative integer in it.

    For example, the MEX of [-1,2,3] is 0 while the MEX of [1,0,3] is 2.

Return the maximum MEX of nums after applying the mentioned operation any number of times.

 

Example 1:

Input: nums = [1,-10,7,13,6,8], value = 5
Output: 4
Explanation: One can achieve this result by applying the following operations:
- Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
- Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
- Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]
The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.

Example 2:

Input: nums = [1,-10,7,13,6,8], value = 7
Output: 2
Explanation: One can achieve this result by applying the following operation:
- subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]
The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.

 

Constraints:

    1 <= nums.length, value <= 105
    -109 <= nums[i] <= 109

//------------------------------------

2598. Наименьшее пропущенное неотрицательное целое число после операций

Вам дан массив целых чисел nums с индексом 0 и целое число value.

За одну операцию вы можете добавить или вычесть value из любого элемента массива nums.

Например, если nums = [1,2,3] и value = 2, вы можете выбрать вычитание value из nums[0], чтобы получить nums = [-1,2,3].

MEX (минимальное исключаемое значение) массива — это наименьшее пропущенное неотрицательное целое число в нём.

Например, MEX массива [-1,2,3] равен 0, а MEX массива [1,0,3] равен 2.

Вернуть максимальное MEX массива nums после применения указанной операции любое количество раз.

Пример 1:

Входные данные: nums = [1, -10, 7, 13, 6, 8], значение = 5
Выходные данные: 4
Пояснение: этого результата можно добиться, применив следующие операции:
- Прибавить значение к nums[1] дважды, чтобы получить nums = [1, 0, 7, 13, 6, 8]
- Вычесть значение из nums[2] один раз, чтобы получить nums = [1, 0, 2, 13, 6, 8]
- Вычесть значение из nums[3] дважды, чтобы получить nums = [1, 0, 2, 3, 6, 8]
MEX числа nums равен 4. Можно показать, что 4 — это максимальный MEX, который мы можем получить.

Пример 2:

Входные данные: nums = [1,-10,7,13,6,8], значение = 7
Выходные данные: 2
Пояснение: этого результата можно добиться, применив следующую операцию:
- вычесть значение из nums[2] один раз, чтобы получить nums = [1,-10,0,13,6,8]
MEX числа nums равен 2. Можно показать, что 2 — это максимальный MEX, которого мы можем достичь. 

*/

/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function (nums, value) {
// 1. Створюємо масив для підрахунку частоти кожної остачі
    // (від 0 до value-1).
    const counts = new Array(value).fill(0);
    
    // 2. Заповнюємо масив підрахунків.
    for (const num of nums) {
        // ((num % value) + value) % value - це надійний спосіб
        // отримати невід'ємну остачу в JS, навіть якщо num від'ємне.
        const r = ((num % value) + value) % value;
        counts[r]++;
    }
    
    // 3. Жадібно перевіряємо k = 0, 1, 2, ...
    // k - це число, яке ми намагаємося "створити",
    // і водночас - наш кандидат на MEX.
    let k = 0;
    
    // Поки у нас є елементи з потрібною остачею (k % value)
    // для створення числа k...
    while (counts[k % value] > 0) {
        // ...ми "використовуємо" один такий елемент...
        counts[k % value]--;
        // ...і переходимо до перевірки наступного числа k+1.
        k++;
    }
    
    // Цикл зупинився, тому що counts[k % value] == 0.
    // Це означає, що ми не можемо створити k.
    // Ми успішно створили 0, 1, ..., k-1.
    // Отже, максимальний MEX, якого ми можемо досягти, - це k.
    return k;
};
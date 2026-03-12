/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    // Створюємо сховище для результатів
    const cache = new Map();
    
    return function(...args) {
        // Створюємо унікальний ключ для комбінації аргументів.
        // Оскільки аргументи — це числа, ми можемо перетворити їх на рядок.
        const key = JSON.stringify(args);
        
        // Якщо результат для таких аргументів вже є в кеші — повертаємо його
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        // Якщо результату немає — викликаємо оригінальну функцію
        const result = fn(...args);
        
        // Зберігаємо результат у кеш для майбутніх викликів
        cache.set(key, result);
        
        return result;
    }
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */

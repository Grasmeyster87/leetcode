/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */

var debounce = function(fn, t) {
    let timer; // зберігаємо ідентифікатор таймера
    
    return function(...args) {
        // якщо функцію викликали знову — скасовуємо попередній таймер
        clearTimeout(timer);
        
        // запускаємо новий таймер
        timer = setTimeout(() => {
            fn(...args);
        }, t);
    };
};

/**
 * Приклад використання:
 * const log = debounce(console.log, 100);
 * log('Hello'); // скасовано
 * log('Hello'); // скасовано
 * log('Hello'); // виконається через 100мс
 */

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
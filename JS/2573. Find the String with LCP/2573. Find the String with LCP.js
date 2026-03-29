/**
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function (lcp) {
    const n = lcp.length;
    const res = new Array(n).fill('');
    let charCode = 97; // Код символу 'a'

    // 1. Жадібно заповнюємо рядок
    for (let i = 0; i < n; i++) {
        if (res[i] !== '') continue; // Пропускаємо, якщо символ вже призначено

        // Якщо нам потрібно більше 26 символів, розв'язку не існує
        if (charCode > 122) return ''; // Код символу 'z'

        const char = String.fromCharCode(charCode++);
        for (let j = i; j < n; j++) {
            // Якщо lcp[i][j] > 0, то word[i] == word[j]
            if (lcp[i][j] > 0) {
                res[j] = char;
            }
        }
    }

    // Перевіряємо, чи всі індекси заповнені (захист від некоректних lcp)
    for (let i = 0; i < n; i++) {
        if (res[i] === '') return '';
    }

    const word = res.join('');

    // 2. Валідація побудованого рядка за допомогою динамічного програмування
    // Перевіряємо властивість: lcp[i][j] = (word[i] == word[j]) ? lcp[i+1][j+1] + 1 : 0
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            let expectedLCP = 0;
            if (word[i] === word[j]) {
                expectedLCP =
                    i + 1 < n && j + 1 < n ? lcp[i + 1][j + 1] + 1 : 1;
            }

            if (lcp[i][j] !== expectedLCP) {
                return '';
            }
        }
    }

    return word;
};

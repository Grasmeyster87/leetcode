/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var generateString = function (str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const totalLen = n + m - 1;
    const ans = new Array(totalLen).fill('?');

    // Крок 1: Застосовуємо всі умови 'T'
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                const idx = i + j;
                // Якщо позиція вже зайнята іншим символом - конфлікт
                if (ans[idx] !== '?' && ans[idx] !== str2[j]) {
                    return '';
                }
                ans[idx] = str2[j];
            }
        }
    }

    // Крок 2: Ініціалізуємо стан для умов 'F'
    const q_count = new Int32Array(n).fill(0); // Кількість '?' у вікні i
    const mismatch = new Uint8Array(n).fill(0); // 1, якщо вікно вже має розбіжність

    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            for (let j = 0; j < m; j++) {
                const idx = i + j;
                if (ans[idx] === '?') {
                    q_count[i]++;
                } else if (ans[idx] !== str2[j]) {
                    mismatch[i] = 1;
                }
            }
            // Якщо '?' не залишилося і немає розбіжностей - умова 'F' порушена
            if (q_count[i] === 0 && mismatch[i] === 0) {
                return '';
            }
        }
    }

    // Крок 3: Жадібно заповнюємо '?' зліва направо
    for (let k = 0; k < totalLen; k++) {
        if (ans[k] === '?') {
            let forbidden_mask = 0;

            // Визначаємо межі вікон 'F', які перетинаються з індексом k
            const startI = Math.max(0, k - m + 1);
            const endI = Math.min(n - 1, k);

            for (let i = startI; i <= endI; i++) {
                if (str1[i] === 'F') {
                    // Якщо це ОСТАННІЙ '?' у вікні і розбіжностей досі немає
                    if (mismatch[i] === 0 && q_count[i] === 1) {
                        const charIdx = str2.charCodeAt(k - i) - 97;
                        forbidden_mask |= 1 << charIdx;
                    }
                }
            }

            // Знаходимо лексикографічно найменший дозволений символ
            let pickedChar = '';
            for (let c = 0; c < 26; c++) {
                if ((forbidden_mask & (1 << c)) === 0) {
                    pickedChar = String.fromCharCode(97 + c);
                    break;
                }
            }

            // Якщо всі 26 символів заборонені (практично неможливо, але для безпеки)
            if (pickedChar === '') {
                return '';
            }

            ans[k] = pickedChar;

            // Оновлюємо стан вікон 'F' після вибору символу
            for (let i = startI; i <= endI; i++) {
                if (str1[i] === 'F') {
                    q_count[i]--;
                    if (pickedChar !== str2[k - i]) {
                        mismatch[i] = 1;
                    }
                }
            }
        }
    }

    return ans.join('');
};

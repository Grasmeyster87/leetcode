/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */

// Digit DP: рахуємо f(N) = сума хвилястості всіх чисел від 0 до N
// Відповідь = f(num2) - f(num1 - 1)
//
// Стан: (pos, pprev, prev, tight, started)
//   pos     — поточна позиція в цифрах числа (0..len-1)
//   pprev   — перед-попередня цифра (10 = немає)
//   prev    — попередня цифра (10 = немає)
//   tight   — чи обмежені верхньою межею
//   started — чи число вже "почалось" (ведучий нуль)
//
// Повертаємо [count, totalWaviness]:
//   count — кількість чисел у піддереві
//   totalWaviness — сумарна хвилястість

var totalWaviness = function(num1, num2) {
    return solve(num2) - solve(num1 - 1);
};

function solve(n) {
    if (n < 0) return 0;
    const digits = [];
    if (n === 0) {
        digits.push(0);
    } else {
        let tmp = n;
        while (tmp > 0) {
            digits.push(tmp % 10);
            tmp = Math.floor(tmp / 10);
        }
        digits.reverse();
    }
    const len = digits.length;
    // memo: pos × pprev(11) × prev(11) × tight(2) × started(2)
    // Зберігаємо [count, sum] як два окремих масиви для швидкості
    const size = len * 11 * 11 * 2 * 2;
    const memoCount = new Float64Array(size);
    const memoSum = new Float64Array(size);
    const memoVisited = new Uint8Array(size);

    function idx(pos, pprev, prev, tight, started) {
        return ((((pos * 11 + pprev) * 11 + prev) * 2 + tight) * 2 + started);
    }

    function dp(pos, pprev, prev, tight, started) {
        if (pos === len) {
            return [1, 0]; // одне число, 0 додаткової хвилястості
        }

        const key = idx(pos, pprev, prev, tight, started);
        if (memoVisited[key]) {
            return [memoCount[key], memoSum[key]];
        }

        const limit = tight ? digits[pos] : 9;
        let totalCount = 0;
        let totalSum = 0;

        for (let d = 0; d <= limit; d++) {
            const newTight = tight && (d === limit) ? 1 : 0;
            let newStarted, newPprev, newPrev;

            if (!started && d === 0) {
                // Число ще не почалось (ведучий нуль)
                newStarted = 0;
                newPprev = 10;
                newPrev = 10;
            } else {
                newStarted = 1;
                newPprev = prev;
                newPrev = d;
            }

            const [cnt, sm] = dp(pos + 1, newPprev, newPrev, newTight, newStarted);

            // Перевірка: чи prev (цифра на позиції pos-1) є піком/западиною
            // prev стає внутрішньою цифрою з лівим сусідом pprev та правим сусідом d
            // Можна перевірити тільки коли started=1, pprev!=10, prev!=10
            let wave = 0;
            if (started && pprev !== 10 && prev !== 10) {
                if ((prev > pprev && prev > d) || (prev < pprev && prev < d)) {
                    wave = 1;
                }
            }

            totalCount += cnt;
            totalSum += sm + wave * cnt;
        }

        memoVisited[key] = 1;
        memoCount[key] = totalCount;
        memoSum[key] = totalSum;

        return [totalCount, totalSum];
    }

    const [, result] = dp(0, 10, 10, 1, 0);
    return result;
}
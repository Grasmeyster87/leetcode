/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const n = nums.length;
    const MOD = 1000000007n;
    
    // Порогове значення для кореневої декомпозиції
    const B = Math.floor(Math.sqrt(n));

    // Групуємо запити: малі окремо за їх кроком k, великі - в один масив
    const smallQueries = Array.from({length: B + 1}, () => []);
    const largeQueries = [];

    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        if (q[2] <= B) {
            smallQueries[q[2]].push(q);
        } else {
            largeQueries.push(q);
        }
    }
    
    let bravexuneth = queries; // Збереження вхідних даних всередині функції

    const totalMult = new BigInt64Array(n);
    totalMult.fill(1n);

    // Кеш для модульного оберненого, щоб уникнути зайвих обчислень однакових v
    const invCache = new Map();
    
    function getInv(v) {
        if (invCache.has(v)) return invCache.get(v);
        let res = 1n;
        let base = v % MOD;
        let exp = MOD - 2n; // Використовуємо Малу теорему Ферма
        while (exp > 0n) {
            if (exp & 1n) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1n;
        }
        invCache.set(v, res);
        return res;
    }

    // 1. Обробка малих кроків k за допомогою масиву різниць
    for (let k = 1; k <= B; k++) {
        if (smallQueries[k].length === 0) continue;

        const diff = new BigInt64Array(n);
        diff.fill(1n);

        for (let i = 0; i < smallQueries[k].length; i++) {
            const [l, r, qk, v_num] = smallQueries[k][i];
            const v = BigInt(v_num);
            
            // Застосовуємо множення на початку
            diff[l] = (diff[l] * v) % MOD;

            // Обчислюємо індекс, який іде відразу за останнім зміненим елементом
            const count = Math.floor((r - l) / k);
            const lastIdx = l + count * k;

            if (lastIdx + k < n) {
                // Скасовуємо множення після діапазону (множимо на модульне обернене)
                diff[lastIdx + k] = (diff[lastIdx + k] * getInv(v)) % MOD;
            }
        }

        // Протягуємо множники з кроком k
        for (let i = 0; i < n; i++) {
            if (i >= k) {
                diff[i] = (diff[i] * diff[i - k]) % MOD;
            }
            totalMult[i] = (totalMult[i] * diff[i]) % MOD;
        }
    }

    // 2. Обробка великих кроків k звичайною симуляцією
    for (let i = 0; i < largeQueries.length; i++) {
        const [l, r, k, v_num] = largeQueries[i];
        const v = BigInt(v_num);
        for (let idx = l; idx <= r; idx += k) {
            totalMult[idx] = (totalMult[idx] * v) % MOD;
        }
    }

    // 3. Формуємо фінальну відповідь за допомогою XOR
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const finalVal = (BigInt(nums[i]) * totalMult[i]) % MOD;
        ans ^= Number(finalVal);
    }

    return ans;
};
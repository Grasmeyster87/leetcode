// Решето найменших простих дільників (SPF) — обчислюється один раз
const MAX = 1000001;
const spf = new Int32Array(MAX);
for (let i = 2; i < MAX; i++) {
    if (spf[i] === 0) {
        for (let j = i; j < MAX; j += i) {
            if (spf[j] === 0) spf[j] = i;
        }
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var minJumps = function(nums) {
    const n = nums.length;
    if (n === 1) return 0;

    // Для кожного простого p — список індексів j, де p | nums[j]
    const group = new Map();
    for (let j = 0; j < n; j++) {
        let x = nums[j];
        while (x > 1) {
            const p = spf[x];
            if (!group.has(p)) group.set(p, []);
            group.get(p).push(j);
            while (x % p === 0) x = x / p;
        }
    }

    // BFS
    const dist = new Int32Array(n).fill(-1);
    dist[0] = 0;
    const queue = [0];
    let head = 0;

    while (head < queue.length) {
        const i = queue[head++];
        const d = dist[i];

        // Сусідні кроки
        if (i + 1 < n && dist[i + 1] === -1) {
            if (i + 1 === n - 1) return d + 1;
            dist[i + 1] = d + 1;
            queue.push(i + 1);
        }
        if (i - 1 >= 0 && dist[i - 1] === -1) {
            dist[i - 1] = d + 1;
            queue.push(i - 1);
        }

        // Телепортація по простому числу
        const val = nums[i];
        if (val >= 2 && spf[val] === val) {
            // val — просте число p
            if (group.has(val)) {
                const indices = group.get(val);
                for (const j of indices) {
                    if (dist[j] === -1) {
                        if (j === n - 1) return d + 1;
                        dist[j] = d + 1;
                        queue.push(j);
                    }
                }
                group.delete(val);
            }
        }
    }

    return dist[n - 1];
};
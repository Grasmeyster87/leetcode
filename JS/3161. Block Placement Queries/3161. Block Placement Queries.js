/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var getResults = function(queries) {
    let M = 0;
    for (let i = 0; i < queries.length; i++) {
        if (queries[i][1] > M) {
            M = queries[i][1];
        }
    }
    
    // Гарантуємо, що M >= 1
    M = Math.max(M, 1);
    
    const treeSize = 4 * (M + 1);
    const max_gap = new Int32Array(treeSize);
    const max_obs = new Int32Array(treeSize);
    const min_obs = new Int32Array(treeSize);
    
    max_obs.fill(-1);
    min_obs.fill(1e9);
    
    function update(node, l, r, idx, val_gap) {
        if (l === r) {
            max_gap[node] = val_gap;
            max_obs[node] = idx;
            min_obs[node] = idx;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = left + 1;
        if (idx <= mid) {
            update(left, l, mid, idx, val_gap);
        } else {
            update(right, mid + 1, r, idx, val_gap);
        }
        max_gap[node] = Math.max(max_gap[left], max_gap[right]);
        max_obs[node] = Math.max(max_obs[left], max_obs[right]);
        min_obs[node] = Math.min(min_obs[left], min_obs[right]);
    }
    
    function update_gap(node, l, r, idx, val_gap) {
        if (l === r) {
            max_gap[node] = val_gap;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = left + 1;
        if (idx <= mid) {
            update_gap(left, l, mid, idx, val_gap);
        } else {
            update_gap(right, mid + 1, r, idx, val_gap);
        }
        max_gap[node] = Math.max(max_gap[left], max_gap[right]);
    }
    
    function query_max_obs(node, l, r, ql, qr) {
        if (ql > r || qr < l) return -1;
        if (ql <= l && r <= qr) return max_obs[node];
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = left + 1;
        return Math.max(
            query_max_obs(left, l, mid, ql, qr),
            query_max_obs(right, mid + 1, r, ql, qr)
        );
    }

    function query_min_obs(node, l, r, ql, qr) {
        if (ql > r || qr < l) return 1e9;
        if (ql <= l && r <= qr) return min_obs[node];
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = left + 1;
        return Math.min(
            query_min_obs(left, l, mid, ql, qr),
            query_min_obs(right, mid + 1, r, ql, qr)
        );
    }
    
    function query_max_gap(node, l, r, ql, qr) {
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return max_gap[node];
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = left + 1;
        return Math.max(
            query_max_gap(left, l, mid, ql, qr),
            query_max_gap(right, mid + 1, r, ql, qr)
        );
    }
    
    // Початковий стан: перешкода на x = 0
    update(1, 0, M, 0, 0);
    
    const res = [];
    
    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        if (q[0] === 1) {
            const x = q[1];
            // Знаходимо сусідні перешкоди
            const prev = query_max_obs(1, 0, M, 0, x - 1);
            const next = query_min_obs(1, 0, M, x + 1, M);
            
            // Додаємо нову перешкоду
            update(1, 0, M, x, x - prev);
            
            // Оновлюємо розрив для наступної перешкоди
            if (next !== 1e9) {
                update_gap(1, 0, M, next, next - x);
            }
        } else {
            const x = q[1];
            const sz = q[2];
            
            // Остання перешкода на відрізку [0, x]
            const prev = query_max_obs(1, 0, M, 0, x);
            
            let max_gap_in_range = 0;
            if (prev >= 0) {
                max_gap_in_range = query_max_gap(1, 0, M, 0, prev);
            }
            
            // Перевіряємо залишковий розрив між останньою перешкодою та точкою x
            const last_gap = x - prev;
            const max_possible = Math.max(max_gap_in_range, last_gap);
            
            res.push(max_possible >= sz);
        }
    }
    
    return res;
};
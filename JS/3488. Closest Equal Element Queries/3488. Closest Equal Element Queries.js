/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var solveQueries = function(nums, queries) {
    const n = nums.length;
    const valToIndices = new Map();
    for (let i = 0; i < n; i++) {
        if (!valToIndices.has(nums[i])) {
            valToIndices.set(nums[i], []);
        }
        valToIndices.get(nums[i]).push(i);
    }

    const indexResults = new Int32Array(n).fill(-2); // -2 means not calculated

    const getResult = (qIdx) => {
        if (indexResults[qIdx] !== -2) {
            return indexResults[qIdx];
        }

        const v = nums[qIdx];
        const indices = valToIndices.get(v);
        const m = indices.length;

        if (m === 1) {
            indexResults[qIdx] = -1;
            return -1;
        }

        // Since we want to pre-calculate all indices for this value at once to be efficient
        for (let k = 0; k < m; k++) {
            const curr = indices[k];
            const prev = indices[(k - 1 + m) % m];
            const next = indices[(k + 1) % m];

            const d1 = Math.abs(curr - prev);
            const dist1 = Math.min(d1, n - d1);
            
            const d2 = Math.abs(curr - next);
            const dist2 = Math.min(d2, n - d2);

            indexResults[curr] = Math.min(dist1, dist2);
        }

        return indexResults[qIdx];
    };

    return queries.map(qIdx => getResult(qIdx));
};